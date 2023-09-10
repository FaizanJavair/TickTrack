import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/settings";
import Weather from "../screens/weather";
import Tasks from "../screens/todo";
import Habits from "../screens/habit";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
// Setting up tab navigation
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let icon;
          if (route.name === "Tasks") {
            icon = focused ? "list" : "list-outline";
          } else if (route.name === "Habit Tracker") {
            icon = focused ? "person" : "person-outline";
          } else if (route.name === "Weather") {
            icon = focused ? "rainy" : "rainy-outline";
          } else if (route.name === "Settings") {
            icon = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={icon} style={{ fontSize: 25 }} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Habit Tracker" component={Habits} />
      <Tab.Screen name="Weather" component={Weather} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNav;
