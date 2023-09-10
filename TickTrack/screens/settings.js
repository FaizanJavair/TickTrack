import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../database/firebase";
import AntDesign from "@expo/vector-icons/AntDesign";

// Settings page that allows user to logout
const Settings = ({ navigation }) => {
  // Handling Logging Out
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  // Rendering the Screen
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text style={styles.head}>Username</Text>
        <Text style={styles.text}>{auth.currentUser.displayName}</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.head}>Email</Text>
        <Text style={styles.text}>{auth.currentUser.email}</Text>
      </View>
      <View style={styles.view}>
        <Text style={styles.head}>Tick Track Version</Text>
        <Text style={styles.text}>1.0.0</Text>
      </View>

      <TouchableOpacity
        style={styles.logButton}
        activeOpacity={0.5}
        onPress={handleLogout}
      >
        <Text style={styles.logText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  logButton: {
    width: "60%",
    marginHorizontal: "20%",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    height: 40,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    marginHorizontal: 10,
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: "300",
  },
  head: {
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.5)",
  },
  view: {
    borderBottomColor: "rgba(0, 0, 0, 0.4)",
    borderBottomWidth: 1,
  },
  logText: {
    color: "red",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Settings;
