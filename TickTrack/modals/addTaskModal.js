import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";
import { styles } from "../css/addTaskModalStyle";
// Adding Task to the list
export default class AddTask extends React.Component {
  // Setting states
  state = {
    newTodo: "",
    dueDateTime: "",
    date: new Date(),
    show: false,
    text: "",
  };
  // Setting the date when selected
  onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate || this.state.date;

    this.setState({ dueDateTime: currentDateTime });

    this.setState({ show: Platform.OS === "ios" });

    let tempDate = new Date(currentDateTime);
    let ds = tempDate.getTime() / 1000;

    let t = moment.unix(ds).format("DD/MM/YYYY");
    let ft = moment.unix(ds).format("h:mm a");

    this.setState({ text: t + " | " + ft });
  };
  // Toggling the show mode for datatimepicker
  showMode = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  // Add's the task to the list when form is submitted
  addTask = () => {
    if (this.state.newTodo == "") {
      return Alert.alert(
        "You Forgot Something",
        "Give your task a name to continue.",
        [
          {
            text: "OK",
          },
        ]
      );
    } else {
      const list = this.props.list;
      list.todos.push({
        id: uuid.v1(),
        title: this.state.newTodo,
        completed: false,
        dueDateTime: this.state.dueDateTime,
        text: this.state.text,
      });
      this.props.updateList(list);
      this.setState({ newTodo: "" });
      Keyboard.dismiss();
    }
  };
  // Rendering the form to add a task
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

          <View>
            <View style={{ flexDirection: "row", marginTop: "3%" }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: list.color }]}
                onPress={() => this.showMode()}
              >
                <Text style={styles.dateText}>Due Date & Time</Text>
              </TouchableOpacity>
              <Text style={styles.date}>{this.state.text}</Text>
            </View>

            {this.state.show && (
              <View
                style={{
                  width: 330,
                  backgroundColor: "gray",
                  paddingHorizontal: 20,
                  borderRadius: 12,
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.date}
                  mode="datetime"
                  is24Hour={true}
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={this.onChange}
                  onTouchCancel={() => this.onChange()}
                  positiveButton={{ label: "OK", textColor: "green" }}
                  negativeButton={{ label: "Cancel", textColor: "red" }}
                />
              </View>
            )}
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
