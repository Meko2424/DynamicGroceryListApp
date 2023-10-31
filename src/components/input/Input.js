import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const Input = ({outlined, ...props}) => {
  return (
    <TextInput
      placeholderTextColor={colors.midGrey}
      style={[styles.input, outlined ? styles.outlined : {}]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 10,
    color: colors.black,
    marginVertical: 12,
    fontSize: 15,
  },
  outlined: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.grey,
    marginHorizontal: 24,
  },
});
export default Input;
