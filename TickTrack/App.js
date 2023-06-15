import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import StackNav from './components/StackNavigation';

import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login';

export default function App() {
  return (
   <Login></Login>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
