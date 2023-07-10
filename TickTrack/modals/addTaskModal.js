import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class AddTask extends React.Component {
  state = {
    newTodo: "",
  };
  addTask = () => {
    const list = this.props.list;
    list.todos.push({ title: this.state.newTodo, completed: false });
    this.props.updateList(list);
    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  render() {
    const list = this.props.list;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <Ionicons name="close-outline" size={30} />
        </TouchableOpacity>
        <KeyboardAvoidingView style={[styles.section]} behavior="padding">
          <Text style={styles.title}>Create Your Task</Text>
          <TextInput
            style={[styles.input, { borderColor: list.color }]}
            onChangeText={(text) => this.setState({ newTodo: text })}
            value={this.state.newTodo}
          />
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.add, { backgroundColor: list.color }]}
              onPress={() => {
                this.addTask();
              }}
              onPressOut={this.props.closeModal}
            >
              <Text style={[styles.homeTask]}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingVertical: "5%",
    alignItems: "center",
  },
  add: {
    borderRadius: 12,
    padding: 12,
    width: "50%",
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  homeTask: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  closeButton: {
    position: "absolute",
    top: "7%",
    left: "7%",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginBottom: "5%",
  },
});
