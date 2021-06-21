import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoadingSpinner = ({size = 50}) => {
  let spinValue = new Animated.Value(0);
  let intValue = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }),
  ).start();

  const styles = StyleSheet.create({
    spinner: {
      width: size,
      height: size,
      transform: [{rotate: intValue}],
    },
  });

  return (
    <Animated.View style={styles.spinner}>
      <Icon name="loading" size={size} />
    </Animated.View>
  );
};

export default LoadingSpinner;
