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
import {TempSettingsProvidor} from './state/TempSettingsContext';

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
      <TempSettingsProvidor>
        <SettingsProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SettingsProvider>
      </TempSettingsProvidor>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
