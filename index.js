/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {UserProvider} from './state/UserContext';
import {SettingsProvider} from './state/AppSettingsContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
  },
};

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <SettingsProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SettingsProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
