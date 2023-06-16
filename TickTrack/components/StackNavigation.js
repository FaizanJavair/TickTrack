import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./login";
import Register from "./register";
import Home from "../screens/home";
import TabNav from "./TabNavigation";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Screen = () => {
  return (
    <NavigationContainer>
      <StackNav></StackNav>
    </NavigationContainer>
  );
};
export default Screen;
