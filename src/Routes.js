import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

import {setUser} from './store/user';
import DrawerContent from './components/drawerContent/DrawerContent';
import Onboard from './screens/Onboard';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
//import Home from './screens/Home';
import Lists from './screens/Lists';
import AddList from './screens/AddList';
import EditList from './screens/EditList';
import ForgotPassword from './screens/ForgotPassword ';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  // Set an initializing state whilst Firebase connects
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [initializing, setInitializing] = useState(true); // decides whether a user is authenticated or not
  // const [user, setUser] = useState(); // use redux dispatch instead

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); // this method is called from the react native firebase library. It listens to the changes when the auth state changes
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  const Tabs = () => (
    <Tab.Navigator screenOptions={{tabBarShowLabel: true, headerShown: false}}>
      {/* <Tab.Screen
        name="Signin"
        component={Signin}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/home_active.png')
                  : require('./assets/home_inactive.png')
              }
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Lists"
        component={Lists}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={styles.icon}
              source={
                focused
                  ? require('./assets/ListView.png')
                  : require('./assets/calendar_inactive.png')
              }
            />
          ),
        }}
      />
      {/* <Tab.Screen name="Lists" component={Lists} /> */}
    </Tab.Navigator>
  );

  if (user) {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: false}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="AddList" component={AddList} />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Routes;
