import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';

import {setToUpdate, setLists} from '../store/lists';
import Checkbox from '../components/checkbox/Checkbox';
import Header from '../components/header/Header';
import PlusIcon from '../components/plusIcon/PlusIcon';
import colors from '../constants/colors';
import Title from '../components/title/Title';

const Lists = ({navigation}) => {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.lists.data);
  const user = useSelector(state => state.user.data);
  const toUpdate = useSelector(state => state.lists.toUpdate);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editItem, setEditItem] = useState(null);
  const onEditItem = item => {
    setEditItem(item); // Set the item to be edited
    setEditedTitle(item.title); // Set the edited title to the current title
    setIsEditing(true); // Enable the editing mode
  };

  const onSaveEditedItem = () => {
    // Update the Firestore database with the edited title
    firestore()
      .collection('Lists')
      .doc(editItem.uid)
      .update({
        title: editedTitle, // Update the title field
      })
      .then(() => {
        setIsEditing(false); // Disable editing mode
        dispatch(setToUpdate());
      });
  };

  const onListUpdate = item => {
    // Update the Firestore database with checked title
    firestore()
      .collection('Lists')
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      });
  };

  const onDeleteItem = item => {
    firestore()
      .collection('Lists')
      .doc(item?.uid)
      .delete()
      .then(() => {
        // Remove the deleted list from the Redux store
        const updatedLists = lists.filter(list => list.uid !== item.uid);
        dispatch(setLists(updatedLists));
      });
  };

  useEffect(() => {
    firestore()
      .collection('Lists')
      .where('userId', '==', user?.uid)
      .get()
      .then(querySnapshot => {
        const listsList = [];

        querySnapshot.forEach(documentSnapshot => {
          listsList.push({
            uid: documentSnapshot.id,
            ...(documentSnapshot.data() || {}),
          });
        });
        dispatch(setLists(listsList));
      });
  }, [user, toUpdate, dispatch]);

  const renderList = ({item}) => {
    return (
      // <TouchableOpacity>
      <View style={styles.row}>
        <Checkbox checked={item.checked} onPress={() => onListUpdate(item)} />
        {isEditing && editItem?.uid === item.uid ? (
          <TextInput
            style={styles.listText}
            value={editedTitle}
            onChangeText={text => setEditedTitle(text)}
          />
        ) : (
          <Text style={[styles.listText, item?.checked ? styles.checked : {}]}>
            {item.title}
          </Text>
        )}
        <View style={styles.button}>
          {isEditing && editItem?.uid === item.uid ? (
            <Button title="Save" onPress={onSaveEditedItem} />
          ) : (
            <Button
              title="Edit"
              color={'#a9a9a9'}
              onPress={() => onEditItem(item)}
            />
          )}
          <Button
            title="Delete"
            color={'#ff0000'}
            onPress={() => onDeleteItem(item)}
          />
        </View>
      </View>
      // </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Items" />
      <FlatList
        // ListHeaderComponent={<Title type="thin">Items List</Title>}
        data={lists}
        renderItem={renderList}
        keyExtractor={item => String(item?.uid)}
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  listText: {
    color: colors.black,
    marginLeft: 8,
    flex: 1,
    fontSize: 20,
  },
  checked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'double',
  },
  button: {
    //backgroundColor: colors.red,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '32%',
    marginHorizontal: 10,
  },
});

export default Lists;
