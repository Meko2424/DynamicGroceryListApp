// import React, {useState} from 'react';
// import {View, TextInput, Button, StyleSheet} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {setLists} from '../store/lists';

// const EditList = ({route, navigation}) => {
//   const dispatch = useDispatch();
//   const {item} = route.params;
//   const [editedTitle, setEditedTitle] = useState(item.title);

//   const onSaveChanges = () => {
//     // Update the list title in the database
//     // You can implement the logic to update the list in the database here

//     // Assuming you have updated the title in the database, update the Redux store
//     const updatedLists = item.map(list => {
//       if (list.uid === item.uid) {
//         return {
//           ...list,
//           title: editedTitle,
//         };
//       }
//       return list;
//     });

//     dispatch(setLists(updatedLists));

//     // Navigate back to the Lists screen
//     // navigation.goBack();
//     navigation.navigate('Lists');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={editedTitle}
//         onChangeText={setEditedTitle}
//         placeholder="Enter list title"
//       />
//       <Button title="Save Changes" onPress={onSaveChanges} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

// export default EditList;

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
//import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setLists} from '../store/lists';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/buttons/Button';
import Header from '../components/header/Header';
import Title from '../components/title/Title';
import colors from '../constants/colors';
import Input from '../components/input/Input';

const EditList = ({route, navigation}) => {
  const dispatch = useDispatch();
  // const [title, setTitle] = useState('');

  const lists = useSelector(state => state.lists.data);
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  const [editedTitle, setEditedTitle] = useState(item.title);
  const handleBack = () => {
    navigation.goBack();
  };
  const onSaveChanges = () => {
    //     // Update the list title in the database

    //     // Assuming you have updated the title in the database, update the Redux store
    //     item.title = editedTitle; // Update the title directly

    //     // Update the Redux store with the modified item
    //     dispatch(setLists([...lists])); // Make sure to replace "lists" with your actual Redux state variable

    //     // Navigate back to the Lists screen
    //     navigation.goBack();
    //   };

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
    //     <View style={styles.container}>
    //       <TextInput
    //         style={styles.input}
    //         value={editedTitle}
    //         onChangeText={setEditedTitle}
    //         placeholder="Enter list title"
    //       />
    //       <Button title="Save Changes" onPress={onSaveChanges} />
    //     </View>

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
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

//================================2nd downchoice
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   SafeAreaView,
//   Pressable,
//   Image,
//   ScrollView,
// } from 'react-native';
// //import {useDispatch} from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import {setToUpdate} from '../store/lists';
// import {setLists} from '../store/lists';
// import {useDispatch, useSelector} from 'react-redux';
// import Button from '../components/buttons/Button';
// import Header from '../components/header/Header';
// import Title from '../components/title/Title';
// import colors from '../constants/colors';
// import Input from '../components/input/Input';

// const EditList = ({route, navigation}) => {
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user.data);

//   const lists = useSelector(state => state.lists.data);
//   const [loading, setLoading] = useState(false);
//   const {item} = route.params;
//   const [editedTitle, setEditedTitle] = useState(item.title);
//   const handleBack = () => {
//     navigation.goBack();
//   };
//   const onSaveChanges = () => {
//     // setLoading(true);
//     // firestore()
//     //   .collection('Lists')
//     //   .update({
//     //     //editedTitle: item.title,

//     //     userId: user?.uid,
//     //   })
//     //   .then(() => {
//     //     //setLoading(false);
//     //     //dispatch(setToUpdate());
//     //     //navigation.navigate('Lists');
//     //     //setTitle(''); // reset the title
//     //   })
//     //   .catch(e => {
//     //     console.log('error when adding list...', e);
//     //     setLoading(false);
//     //     Alert.alert(e.message);
//     //   });
//     item.title = editedTitle;
//     dispatch(setLists([...lists]));
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Header title="Edit Lists" /> */}
//       <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
//         <Image style={styles.backIcon} source={require('../assets/back.png')} />
//       </Pressable>

//       <ScrollView>
//         <Title type="thin">edit List</Title>

//         <Text style={styles.label}>Describe the List</Text>
//         <Input value={editedTitle} onChangeText={setEditedTitle} outlined />

//         {loading ? (
//           <ActivityIndicator /> // loading activity indicater from react native
//         ) : (
//           <Button style={styles.button} type="blue" onPress={onSaveChanges}>
//             Save Changes
//           </Button>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   backContainer: {
//     padding: 24,
//   },
//   backIcon: {
//     width: 32,
//     height: 32,
//   },
//   label: {
//     fontSize: 12,
//     color: colors.black,
//     marginHorizontal: 24,
//     fontWeight: '700',
//     marginTop: 12,
//   },
//   button: {
//     margin: 24,
//   },
// });

// export default EditList;
//===================================================================
// import React, {useState} from 'react';
// import {View, TextInput, Button, StyleSheet} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {setLists} from '../store/lists';
// //const lists = useSelector(state => state.lists.data);
// const EditList = ({route, navigation}) => {
//   const dispatch = useDispatch();
//   const {item} = route.params;
//   const [editedTitle, setEditedTitle] = useState(item.title);

//   const onSaveChanges = () => {
//     // Update the list title in the database
//     // You can implement the logic to update the list in the database here

//     // Assuming you have updated the title in the database, update the Redux store
//     item.title = editedTitle; // Update the title directly

//     // Update the Redux store with the modified item
//     dispatch(setLists(lists)); // Make sure to replace "lists" with your actual Redux state variable

//     // Navigate back to the Lists screen
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={editedTitle}
//         onChangeText={setEditedTitle}
//         placeholder="Enter list title"
//       />
//       <Button title="Save Changes" onPress={onSaveChanges} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

// export default EditList;
