import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const Checkbox = ({checked, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, checked ? {borderWidth: 2} : {}]}>
      {checked ? <View style={styles.innerSquare} /> : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 3,
    height: 18,
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  innerSquare: {
    width: 10,
    height: 10,
    backgroundColor: colors.purple,
  },
});

export default Checkbox;
