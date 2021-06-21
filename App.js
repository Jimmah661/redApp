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

const window = Dimensions.get('window');

const App = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView style={[styles.flexOne, {backgroundColor: colors.primary}]}>
      <View style={styles.flexOne}>
        <PostViewer>
          <MenuDrawer />
          {/* <PostModal /> */}
        </PostViewer>
        <TaskBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: window.height,
    width: window.width,
  },
  flexOne: {
    flex: 1,
  },
});

export default App;
