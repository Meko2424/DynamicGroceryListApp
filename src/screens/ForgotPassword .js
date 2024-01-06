import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Button from '../components/buttons/Button';
import Input from '../components/input/Input';
import Title from '../components/title/Title';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Please enter your email address');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password reset email sent. Check your inbox.');
        navigation.navigate('Signin');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>Request a password reset</Text>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Enter your email"
    //     onChangeText={text => setEmail(text)}
    //     value={email}
    //   />
    //   <Button title="Send a Link" type="blue" onPress={handleResetPassword} />
    //   <Text
    //     style={styles.goBackLink}
    //     onPress={() => navigation.navigate('Signin')}>
    //     {' '}
    //     Go back to Login
    //   </Text>
    // </View>
    <SafeAreaView style={styles.container}>
      {/* <Header title="AddLists" /> */}
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image style={styles.backIcon} source={require('../assets/back.png')} />
      </Pressable>

      <ScrollView>
        <Title type="thin">Request a password reset</Title>

        <Input
          value={email}
          onChangeText={setEmail}
          outlined
          placeholder="Enter your email..."
        />
        <Button style={styles.button} type="blue" onPress={handleResetPassword}>
          Send a Link
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    padding: 24,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  goBackLink: {
    color: 'blue',
  },
  button: {
    margin: 24,
  },
});

export default ForgotPassword;
