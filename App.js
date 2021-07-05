/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import PostViewer from './components/postViewer';
import TaskBar from './components/taskBar';
import MenuDrawer from './components/menuDrawer';
// import PostModal from './components/postModal';
import {useTheme} from 'react-native-paper';
// import {useTempSettings} from './state/TempSettingsContext';

const window = Dimensions.get('window');

const App = () => {
  const {colors} = useTheme();
  // const tempSettings = useTempSettings();

  const styles = StyleSheet.create({
    screen: {
      height: window.height,
      width: window.width,
    },
    flexOne: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={[styles.flexOne, {backgroundColor: colors.primary}]}>
      <View style={styles.flexOne}>
        <PostViewer>
          <MenuDrawer />
        </PostViewer>
        <TaskBar />
      </View>
    </SafeAreaView>
  );
};

export default App;
