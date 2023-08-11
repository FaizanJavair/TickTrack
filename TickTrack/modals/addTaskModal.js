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
  Button,
} from "react-native";
import uuid from "react-native-uuid";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default class AddTask extends React.Component {
  state = {
    newTodo: "",
    dueDate: "",
    date: new Date(),
    show: false,
    text: "",
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({ date: currentDate });
    this.setState({ show: Platform.OS === "ios" });
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    this.setState({ text: fDate });
  };

  showMode = () => {
    this.setState({
      show: true,
    });
  };

  addTask = () => {
    const list = this.props.list;
    list.todos.push({
      id: uuid.v1(),
      title: this.state.newTodo,
      completed: false,
      dueDate: this.state.dueDate,
    });
    this.props.updateList(list);
    this.setState({ newTodo: "" });
    Keyboard.dismiss();
  };

  render() {
    console.log(this.state.dueDate);
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
          <Text>{this.state.text}</Text>
          <View>
            <Button
              title="Date Picker"
              onPress={() =>
                this.setState({
                  show: true,
                })
              }
            />

            <RNDateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              minimumDate={new Date()}
              mode="date"
              is24Hour={true}
              display={"default"}
              onChange={this.onChange}
              onTouchCancel={() => this.setState({ show: false })}
              positiveButton={{ label: "OK", textColor: "green" }}
              negativeButton={{ label: "Cancel", textColor: "red" }}
            />
          </View>

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
