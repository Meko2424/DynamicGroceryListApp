import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
const Button = ({onPress, style, type, children}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, type === 'blue' ? styles.blueBg : {}, style]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 13,
    marginVertical: 8,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  blueBg: {
    backgroundColor: colors.red,
  },
});

export default Button;
