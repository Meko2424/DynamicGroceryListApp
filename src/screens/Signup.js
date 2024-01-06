import React from 'react';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Button from '../components/buttons/Button';
import Input from '../components/input/Input';
import colors from '../constants/colors';
import Title from '../components/title/Title';
import Checkbox from '../components/checkbox/Checkbox';

const Signup = ({navigation}) => {
  const [agree, setAgree] = useState(false);
  const [values, setValues] = useState({});

  const oncheckboxPress = () => {
    setAgree(value => !value);
  };

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    if (!values.firstName || !values.lastName) {
      Alert.alert('Please enter first name and last name');
      return;
    }
    if (!values.password || !values.confirmPassword) {
      Alert.alert('Passwords should not be empty');
      return;
    }

    if (values.password !== values.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (!agree) {
      Alert.alert('You must agree the terms and conditions');
      return;
    }
    // auth coming from react native firebase
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        auth().currentUser.updateProfile({
          displayName: `${values.firstName} ${values.lastName}`,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email address!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Create your account!</Title>
        <Input
          onChangeText={val => onChange(val, 'firstName')}
          placeholder="First Name"
        />
        <Input
          onChangeText={val => onChange(val, 'lastName')}
          placeholder="Last Name"
        />
        <Input
          onChangeText={val => onChange(val, 'email')}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Input
          onChangeText={val => onChange(val, 'password')}
          placeholder="Password"
          secureTextEntry
        />
        <Input
          onChangeText={val => onChange(val, 'confirmPassword')}
          placeholder="Confirm password"
          secureTextEntry
        />

        <View style={styles.row}>
          <Checkbox checked={agree} onPress={oncheckboxPress} />

          <Text style={styles.agreeText}>
            I have read and accept the
            <Text style={styles.links}> Terms and conditions</Text> and
            <Text style={styles.links}> Privacy policy</Text>
          </Text>
        </View>

        <Button onPress={onSubmit} type="blue">
          Signup
        </Button>
        <Text style={styles.footerText}>
          Already a member?
          <Text
            onPress={() => navigation.navigate('Signin')}
            style={styles.footerLink}>
            {' '}
            Sign In!
          </Text>
        </Text>
      </ScrollView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  agreeText: {
    color: colors.grey,
    fontSize: 12,
    marginLeft: 8,
  },
  links: {
    textDecorationLine: 'underline',
  },
});
export default Signup;
