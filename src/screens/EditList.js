import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/buttons/Button';
import Title from '../components/title/Title';
import colors from '../constants/colors';
import Input from '../components/input/Input';

const EditList = ({route, navigation}) => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.data);
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  const [editedTitle, setEditedTitle] = useState(item.title);
  const handleBack = () => {
    navigation.goBack();
  };
  const onSaveChanges = () => {
    if (!editedTitle) {
      Alert.alert('Please enter title...');
      return;
    }
    setLoading(true);
    firestore()
      .collection('Lists')
      .set({
        editedTitle,

        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        navigation.navigate('Lists');
        //setTitle(''); // reset the title
      })
      .catch(e => {
        console.log('error when adding list...', e);
        setLoading(false);
        Alert.alert(e.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Edit Lists" /> */}
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image style={styles.backIcon} source={require('../assets/back.png')} />
      </Pressable>

      <ScrollView>
        <Title type="thin">edit List</Title>

        <Text style={styles.label}>Describe the List</Text>
        <Input
          value={editedTitle}
          onChangeText={setEditedTitle}
          outlined
          //placeholder="Enter list title..."
        />

        {loading ? (
          <ActivityIndicator /> // loading activity indicater from react native
        ) : (
          <Button style={styles.button} type="blue" onPress={onSaveChanges}>
            Save Changes
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  backContainer: {
    padding: 24,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 12,
    color: colors.black,
    marginHorizontal: 24,
    fontWeight: '700',
    marginTop: 12,
  },
  button: {
    margin: 24,
  },
});

export default EditList;
