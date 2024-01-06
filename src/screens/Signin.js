import React from 'react';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import Button from '../components/buttons/Button';
import Title from '../components/title/Title';
import Input from '../components/input/Input';
import colors from '../constants/colors';

const Signin = ({navigation}) => {
  const [values, setValues] = useState({});
  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    if (!values.email || !values.password) {
      Alert.alert('Please enter email and password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        Alert.alert('Signed in!');
        //navigation.navigate('Lists');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email address!');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>Login to your account!</Title>
      <Input
        //  maxLength={10}
        placeholder="Email"
        keyboardType="email-address" // keyboardType is a prop, displays the @ and . characters on the keyboard
        onChangeText={val => onChange(val, 'email')}
      />
      <Input
        placeholder="Password"
        secureTextEntry //secureTextEntry is a prop, to hide the characters entered
        onChangeText={val => onChange(val, 'password')}
      />

      <Button onPress={onSubmit}>Login</Button>

      <Text style={styles.forgotPasswordLink} onPress={handleForgotPassword}>
        Forgot Password?
      </Text>

      <Text style={styles.footerText}>
        Don't have an account?
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.footerLink}>
          {' '}
          Sign Up!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  footerText: {
    color: colors.grey,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 28,
  },
  footerLink: {
    color: colors.purple,
    fontWeight: 'bold',
  },

  forgotPasswordLink: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: colors.red,
    fontWeight: 'bold',
  },
});

export default Signin;
