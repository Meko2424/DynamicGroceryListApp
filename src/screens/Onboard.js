import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import colors from '../constants/colors';
import Button from '../components/buttons/Button';
const Onboard = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image style={styles.image} source={require('../assets/basket1.jpg')} />
        <View style={styles.footer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>The Best Grocery List App</Text>
        <Text style={styles.subtitle}>
          Sorting your groceries will help you organize yourself better and save
          money and time.
        </Text>

        <Button onPress={() => navigation.navigate('Signin')}>Login</Button>
        <Button onPress={() => navigation.navigate('Signup')} type={'blue'}>
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    flex: 1,
  },
  content: {
    padding: 46,
    paddingTop: 0,
    backgroundColor: colors.white,
  },

  title: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    color: colors.grey,
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default Onboard;
