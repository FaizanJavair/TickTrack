import React, { createRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { styles } from "../css/registerStyle";
// Registering page
const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Handling registeration when form submitted
  const handleRegister = () => {
    setError("");
    if (!username) {
      alert("Please fill name");
      return;
    }
    if (!email) {
      alert("Please fill Email");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Registration Successful. Please Login to proceed");
        console.log(user);
        if (user) {
          auth.currentUser
            .updateProfile({
              displayName: username,
            })
            .then(() => navigation.navigate("Home"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setError("That email address is already in use!");
        } else {
          setError(error.message);
        }
      });
  };
  // Rendering Form
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView enabled>
        <Text style={styles.title}>Start Trackin' With Us!</Text>
        <View style={styles.section}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            onChangeText={(text) => setUsername(text)}
            returnKeyType="next"
          />
        </View>
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
          onPress={handleRegister}
        >
          <Text style={styles.logText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Already have an account? Login then!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
