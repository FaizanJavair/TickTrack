import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import StackNav from "./components/StackNavigation";

import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login";
import Screen from "./components/StackNavigation";
export default function App() {
  return <Screen></Screen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
