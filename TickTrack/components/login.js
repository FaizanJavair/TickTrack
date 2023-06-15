import React from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

 const Login = () => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView enabled>
                <View style = {styles.section}>
                    <TextInput
                    style = {styles.inputStyle}
                    placeholder="Email"
                    />
                </View>
                <View style = {styles.section}>
                    <TextInput
                    style = {styles.inputStyle}
                    placeholder="Password"
                    />
                </View>
                <TouchableOpacity
                style = {styles.logButton}
                >
                    <Text style = {styles.logText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {styles.logButton}
                >
                    <Text style = {styles.logText}>Login</Text>
                </TouchableOpacity>

                
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
 }

 const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    section: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        paddingHorizontal: '10%',
        margin: '2%'

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
        backgroundColor: 'black',
        width: '60%',
        marginHorizontal: '20%',
        borderRadius: 15,
        marginVertical: 5,
        height: 40
      },
      logText: {
        color: "white",
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
      }

 });
 export default Login;