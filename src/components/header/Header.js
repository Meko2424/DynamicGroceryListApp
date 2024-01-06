import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import colors from '../../constants/colors';

const Header = ({title, type}) => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openDrawer} hitSlop={8}>
        <Image style={styles.icon} source={require('../../assets/menu2.png')} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.icon}>
        <Pressable>
          <Image
            style={styles.icon}
            source={require('../../assets/shareIcon.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ghostwhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
    color: colors.ghostwhite,
  },
});

export default Header;
