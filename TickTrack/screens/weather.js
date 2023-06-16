import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../database/firebase";

const Weather = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text style={styles.container}>Hello</Text>
      <Text style={styles.container}>
        Display Name: {auth.currentUser?.displayName}
      </Text>
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logText}>Weather Page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  logButton: {
    backgroundColor: "black",
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 15,
    marginVertical: 5,
    height: 40,
  },
  logText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Weather;
