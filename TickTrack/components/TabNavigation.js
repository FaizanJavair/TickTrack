import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/settings";
import Weather from "../screens/weather";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Weather" component={Weather} />
    </Tab.Navigator>
  );
};

export default TabNav;
