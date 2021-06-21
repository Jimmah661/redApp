import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userContext = createContext();
const updateUserContext = createContext();

export function useUser() {
  return useContext(userContext);
}
export function useUpdateUser() {
  return useContext(updateUserContext);
}

const defaultUserData = {
  userName: null,
  isLoggedIn: false,
  defaultSort: 'Best',
};

export const UserProvider = ({children}) => {
  const [user, setUser] = useState();

  const componentMounted = useRef(false);

  useEffect(() => {
    async function getUser() {
      let storedUser = JSON.parse(await AsyncStorage.getItem('redAppUser'));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(defaultUserData);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (componentMounted.current) {
      const userData = JSON.stringify(user);
      async function storeUser() {
        if (user) {
          await AsyncStorage.setItem('redAppUser', userData);
        } else {
          await AsyncStorage.setItem(
            'redAppUser',
            JSON.stringify(defaultUserData),
          );
        }
      }
      storeUser();
    } else {
      componentMounted.current = true;
    }
  }, [user]);

  async function updateUser(updatedSetting, value) {
    await setUser(currentUserSettings => ({
      ...currentUserSettings,
      [updatedSetting]: value,
    }));
  }

  return (
    <userContext.Provider value={user}>
      <updateUserContext.Provider value={updateUser}>
        {children}
      </updateUserContext.Provider>
    </userContext.Provider>
  );
};
