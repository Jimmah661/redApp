import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Text, View, Image} from 'react-native';
import {Drawer, Switch} from 'react-native-paper';
import DrawerItem from './menuDrawer/drawerItem';
import {
  login,
  logout,
  supplyToken,
  refreshKey,
} from '../functions/loginFunctions';
import {useSettings, useUpdateSettings} from '../state/AppSettingsContext';
import {useUser, useUpdateUser} from '../state/UserContext';
import {useTempSettings} from '../state/TempSettingsContext';

const MenuDrawer = () => {
  const user = useUser();
  const updateUser = useUpdateUser();
  const settings = useSettings();
  const updateSettings = useUpdateSettings();
  const tempSettings = useTempSettings();
  // START Drawer state management

  const drawerWidth = useRef(new Animated.Value(-2000)).current;

  useEffect(() => {
    function openDrawer() {
      Animated.timing(drawerWidth, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
      console.info('Drawer Opened');
    }
    function closeDrawer() {
      Animated.timing(drawerWidth, {
        toValue: -2000,
        duration: 350,
        useNativeDriver: true,
      }).start();
      console.info('Drawer Closed');
    }
    if (tempSettings.drawerOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [drawerWidth, tempSettings.drawerOpen]);

  // END Drawer state management

  const styles = StyleSheet.create({
    drawer: {
      height: '100%',
      width: '80%',
      left: 0,
      top: 0,
      backgroundColor: 'white',
      position: 'absolute',
    },
    avatarImage: {
      width: 50,
      height: 50,
      borderRadius: 5000,
      borderWidth: 1,
      borderColor: 'black',
    },
    userContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
  });

  const userStatus = () => {
    if (user.isLoggedIn) {
      return <Text>You're logged in</Text>;
    } else {
      return <Text>You're Logged Out</Text>;
    }
  };

  return (
    <Animated.ScrollView
      style={[
        styles.drawer,
        {
          transform: [{translateX: drawerWidth}],
        },
      ]}>
      <View style={styles.userContainer}>
        <Image
          style={styles.avatarImage}
          source={{
            uri: 'https://styles.redditmedia.com/t5_bpp3b/styles/profileIcon_i0jy0t6ko7171.png',
          }}
        />
        {userStatus()}
      </View>
      <Drawer.Section title="User">
        {user.isLoggedIn ? (
          <Drawer.Item
            label="Log Out"
            onPress={() => {
              logout();
              updateUser('isLoggedIn', false);
            }}
          />
        ) : (
          <Drawer.Item
            label="Log In"
            onPress={() => {
              login();
              updateUser('isLoggedIn', true);
            }}
          />
        )}
        <Drawer.Item
          label="Log supplyToken"
          onPress={() =>
            supplyToken('redappAccessToken').then(val =>
              console.log('Token is ', val),
            )
          }
        />
        <Drawer.Item label="Log User" onPress={() => console.log(user)} />
        <Drawer.Item
          label="Manually refresh key if needed"
          onPress={() => refreshKey()}
        />
      </Drawer.Section>
      <Drawer.Section title="App Defaults">
        <DrawerItem
          label="Left handed"
          right={
            <Switch
              value={settings.leftHanded}
              onValueChange={() =>
                updateSettings('leftHanded', !settings.leftHanded)
              }
            />
          }
        />
        <DrawerItem
          label="Inverted Scrolling"
          right={
            <Switch
              value={settings.invertedScrolling}
              onValueChange={() =>
                updateSettings('invertedScrolling', !settings.invertedScrolling)
              }
            />
          }
        />
        <DrawerItem
          label="Dark Mode"
          right={
            <Switch
              value={settings.darkMode}
              onValueChange={() =>
                updateSettings('darkMode', !settings.darkMode)
              }
            />
          }
        />
      </Drawer.Section>
    </Animated.ScrollView>
  );
};

export default MenuDrawer;
