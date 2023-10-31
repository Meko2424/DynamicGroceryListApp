import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';

const PlusIcon = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('AddList');
    //navigation.navigate('AddGroceryItem');
  };
  return (
    <Pressable style={styles.container} onPress={onPress} hitSlop={8}>
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.blue,
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  plus: {
    fontSize: 32,
    marginTop: -2,
    color: colors.white,
    fontWeight: '600',
  },
});

export default PlusIcon;
