// App.js
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from '../screens/Home';

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Signin} 
        options={
          {title: 'Sigin', 
          headerLeft: null}
        }
      />
      <Stack.Screen 
       name="Home" 
       component={Home} 
       options={
         { title: 'Home',
         headerLeft: null}
       }
      />
    </Stack.Navigator>
  );
}

export default StackNav;