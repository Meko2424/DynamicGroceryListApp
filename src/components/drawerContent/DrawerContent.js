import React from 'react';
import auth from '@react-native-firebase/auth';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, Text, Image, Pressable} from 'react-native';
import colors from '../../constants/colors';

function DrawerContent(props) {
  const {navigation} = props;
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <DrawerContentScrollView {...props}>
      <Text style={styles.link} onPress={() => navigation.navigate('Lists')}>
        Lists
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate('AddList')}>
        Add List
      </Text>
      {/* <Text style={styles.link}>Privacy Policy</Text>
      <Text style={styles.link}>Terms and Conditions</Text> */}
      <Text style={styles.link} onPress={logout}>
        Log out
      </Text>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  link: {
    color: colors.black,
    margin: 8,
    marginHorizontal: 16,
    fontSize: 13,
    fontWeight: '500',
  },
  icon: {
    width: 24,
    height: 24,
    color: colors.ghostwhite,
  },
});

export default DrawerContent;
