import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';

const DrawerItem = ({label, right, onPress, style}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[drawerItemStyles.container, style]}>
        <Text>{label}</Text>
        {right}
      </View>
    </TouchableWithoutFeedback>
  );
};

const drawerItemStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
  },
});

export default DrawerItem;
