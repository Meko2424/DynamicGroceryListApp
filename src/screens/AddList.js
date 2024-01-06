import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  Pressable,
  StyleSheet,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Title from '../components/title/Title';
import Input from '../components/input/Input';
import colors from '../constants/colors';
import Button from '../components/buttons/Button';
import {setToUpdate} from '../store/lists';

const AddList = ({navigation}) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (!title) {
      Alert.alert('Please enter title...');
      return;
    }
    setLoading(true);
    firestore()
      .collection('Lists')
      .add({
        title,

        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        navigation.navigate('Lists');
        setTitle(''); // reset the title
      })
      .catch(e => {
        console.log('error when adding list...', e);
        setLoading(false);
        Alert.alert(e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="AddLists" /> */}
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image style={styles.backIcon} source={require('../assets/back.png')} />
      </Pressable>

      <ScrollView>
        <Title type="thin">Add New List</Title>

        <Text style={styles.label}>Describe the List</Text>
        <Input
          value={title}
          onChangeText={setTitle}
          outlined
          placeholder="Type here..."
        />

        {loading ? (
          <ActivityIndicator /> // loading activity indicater from react native
        ) : (
          <Button style={styles.button} type="blue" onPress={onSubmit}>
            Add to List
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  backContainer: {
    padding: 24,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.black,
    marginHorizontal: 24,
    marginTop: 12,
  },
  button: {
    margin: 24,
  },
});

export default AddList;
