import React from 'react';
import {StyleSheet} from 'react-native';
import {useUser, useUpdateUser} from '../state/UserContext';
import {
  useTempSettings,
  useUpdateTempSettings,
} from '../state/TempSettingsContext';
import {Appbar, Menu, Text} from 'react-native-paper';

const TaskBar = () => {
  const user = useUser();
  const updateUser = useUpdateUser();
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
    updateTempSettings('menuOpen', !tempSettings.menuOpen);
  }

  function changeSortState(sort) {
    updateUser('defaultSort', sort);
    changeMenuState();
  }
  return (
    <Appbar style={styles.appBar}>
      <Appbar.Action
        icon={tempSettings.overlayOpen ? 'undo-variant' : 'menu'}
        onPress={() => {
          if (tempSettings.modalOpen) {
            updateTempSettings('modalOpen', false);
            updateTempSettings('currentlyViewing', null);
          } else if (tempSettings.drawerOpen) {
            updateTempSettings('drawerOpen', false);
          } else if (!tempSettings.modalOpen && !tempSettings.drawerOpen) {
            updateTempSettings('drawerOpen', true);
          }
          updateTempSettings('overlayOpen', !tempSettings.overlayOpen);
        }}
      />
      <Menu
        visible={tempSettings.menuOpen}
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
