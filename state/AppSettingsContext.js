import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsContext = createContext();
const updateSettingsContext = createContext();

export function useSettings() {
  return useContext(settingsContext);
}

export function useUpdateSettings() {
  return useContext(updateSettingsContext);
}

export const SettingsProvider = ({children}) => {
  const [settings, setSettings] = useState({
    leftHanded: false,
    invertedScrolling: false,
    darkMode: false,
    overlayOpen: false,
    drawerOpen: false,
    menuOpen: false,
    modalOpen: false,
    currentlyViewing: null,
  });
  // This ref is to track if the component has mounted once
  // it's used in the second useEffect to prevent it from running in sync with the first useEffect
  const componentMounted = useRef(false);

  // START Settings load on launch

  useEffect(() => {
    async function getSettings() {
      console.info('Getting stored settings');
      let storedSettings = JSON.parse(
        await AsyncStorage.getItem('redAppSettings'),
      );
      console.info('Stored settings are', storedSettings);
      if (storedSettings) {
        console.info('Adding stored settings to defaults');
        setSettings(currentSettings => ({
          ...currentSettings,
          ...storedSettings,
        }));
      }
    }
    getSettings();
  }, []);

  // END Settings load on launch

  // START Settings storage on change

  useEffect(() => {
    if (componentMounted.current) {
      console.info(
        'Component has mounted at least once, running settings update scripts',
      );
      const settingsData = JSON.stringify(settings);
      async function storeSettings() {
        await AsyncStorage.setItem('redAppSettings', settingsData);
      }
      storeSettings();
    } else {
      console.info(
        'component has not finished mounting for the first time, now flicking the switch',
      );
      componentMounted.current = true;
    }
  }, [settings]);

  // END Settings storage on change

  async function updateSettings(newSetting, value) {
    await setSettings(currentSettings => ({
      ...currentSettings,
      [newSetting]: value,
    }));
  }

  return (
    <settingsContext.Provider value={settings}>
      <updateSettingsContext.Provider value={updateSettings}>
        {children}
      </updateSettingsContext.Provider>
    </settingsContext.Provider>
  );
};
