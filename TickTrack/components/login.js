import React, { createRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../database/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      navigation.replace("Home");
    } else {
      setLoggedIn(false);
    }
  });

  const handleLogin = () => {
    setError("");
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>Tick Track</Text>
        <View style={styles.section}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            returnKeyType="next"
          />
        </View>
        <View style={styles.section}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            returnKeyType="next"
          />
        </View>
        {error != "" ? <Text style={styles.errorText}> {error} </Text> : null}
        <TouchableOpacity
          style={styles.logButton}
          activeOpacity={0.5}
          onPress={handleLogin}
        >
          <Text style={styles.logText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.linkText}>
            Don't have an account? Register Now!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "300",
    color: "black",
    textAlign: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  section: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    paddingHorizontal: "10%",
    margin: "2%",
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
  },
  logButton: {
    backgroundColor: "black",
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 12,
    marginVertical: "3%",
    height: 45,
  },
  logText: {
    color: "white",
    paddingVertical: 12,
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 400,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  linkText: {
    color: "gray",
    paddingVertical: 8,
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
export default Login;
