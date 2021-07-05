import React from 'react';
import {StyleSheet} from 'react-native';
import {useUser, useUpdateUser} from '../state/UserContext';
import {useSettings, useUpdateSettings} from '../state/AppSettingsContext';
import {
  useTempSettings,
  useUpdateTempSettings,
} from '../state/TempSettingsContext';
import {Appbar, Menu, Text} from 'react-native-paper';

const TaskBar = () => {
  const user = useUser();
  const updateUser = useUpdateUser();
  const settings = useSettings();
  const updateSettings = useUpdateSettings();
  const tempSettings = useTempSettings();
  const updateTempSettings = useUpdateTempSettings();

  const currentSort = () => {
    if (user) {
      return user.defaultSort;
    } else {
      return 'Best';
    }
  };

  function changeMenuState() {
    updateSettings('menuOpen', !settings.menuOpen);
  }

  function changeSortState(sort) {
    updateUser('defaultSort', sort);
    changeMenuState();
  }
  return (
    <Appbar style={styles.appBar}>
      <Appbar.Action
        icon={settings.overlayOpen ? 'undo-variant' : 'menu'}
        onPress={() => {
          if (settings.modalOpen) {
            updateSettings('modalOpen', false);
            updateSettings('currentlyViewing', null);
          } else if (settings.drawerOpen) {
            updateSettings('drawerOpen', false);
          } else if (!settings.modalOpen && !settings.drawerOpen) {
            updateSettings('drawerOpen', true);
          }
          updateSettings('overlayOpen', !settings.overlayOpen);
        }}
      />
      <Menu
        visible={settings.menuOpen}
        anchor={
          <Text onPress={changeMenuState} style={styles.sortText}>
            {currentSort()}
          </Text>
        }
        onDismiss={changeMenuState}>
        <Menu.Item onPress={() => changeSortState('Hot')} title="Hot" />
        <Menu.Item onPress={() => changeSortState('Best')} title="Best" />
        <Menu.Item onPress={() => changeSortState('New')} title="New" />
        <Menu.Item onPress={() => changeSortState('Top')} title="Top" />
      </Menu>
      <Appbar.Action
        icon={'magnify'}
        onPress={() => updateTempSettings('modalOpen', !tempSettings.modalOpen)}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  sortText: {
    color: 'white',
  },
  appBar: {
    shadowOpacity: 0,
    opacity: 0.5,
  },
});

export default TaskBar;
