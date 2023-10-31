import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const Title = ({children, type}) => {
  return (
    <Text style={[styles.title, type === 'thin' ? styles.thin : {}]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 24,
  },
  thin: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.purple,
    paddingHorizontal: 24,
  },
});

export default Title;
