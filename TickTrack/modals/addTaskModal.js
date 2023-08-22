import React from "react";
import {
  View,
  Text,
  StyleSheet,
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

export default class AddTask extends React.Component {
  state = {
    newTodo: "",
    dueDateTime: "",
    date: new Date(),
    show: false,
    text: "",
  };

  onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate || this.state.date;

    this.setState({ dueDateTime: currentDateTime });

    this.setState({ show: Platform.OS === "ios" });

    let tempDate = new Date(currentDateTime);
    let ds = tempDate.getTime() / 1000;
    console.log(ds);
    let t = moment.unix(ds).format("DD/MM/YYYY");
    let ft = moment.unix(ds).format("h:mm a");

    this.setState({ text: t + " | " + ft });
  };

  showMode = () => {
    this.setState({
      show: !this.state.show,
    });
  };

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
    width: 330,
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
  button: {
    fontSize: 15,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 10,
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  date: {
    marginTop: "2%",
    marginLeft: "2%",
    fontSize: 18,
  },
});
