import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../css/listModalStyle";
// Modal for adding a new list to db
export default class ListModal extends React.Component {
  // Colors for color picker
  colors = [
    "#000000",
    "#28282B",
    "#36454F",
    "#414a4c",
    "#71797E",
    "#708090",
    "#B2BEB5",
  ];
  // Drop down items
  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];
  // Setting states
  state = {
    name: "",
    color: this.colors[0],
    open: false,
    value: null,
    priority: "Low",
    priorityValue: "4",
  };
  // Called when form submitted that creates a new list
  createList = () => {
    if (this.state.name == "") {
      return Alert.alert(
        "You Forgot Something",
        "Give your list a name to continue.",
        [
          {
            text: "OK",
          },
        ]
      );
    } else {
      const { name, color, priority, priorityValue, todos } = this.state;
      const list = { name, color, priority, priorityValue };
      this.props.addTask(list);

      this.setState({ name: "" });
      this.props.closeModal();
    }
  };
  // Renders colors
  renderColors() {
    return this.colors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorOptions, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }
  // Renders the form to add a new list
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.props.closeModal}
        >
          <Ionicons name="close-outline" size={30} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Task List</Text>
          <TextInput
            style={styles.listInput}
            placeholder="Give Your Task List a Name!"
            placeholderTextColor={"gray"}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View style={styles.colorView}>{this.renderColors()}</View>
          <DropDownPicker
            style={styles.picker}
            open={this.state.open}
            onOpen={() => this.setState({ open: true })}
            onClose={() => this.setState({ open: false })}
            items={this.items}
            onSelectItem={(value) =>
              this.setState({
                priority: value.label,
                priorityValue: value.value,
              })
            }
            placeholder={this.state.priority}
          />
          <TouchableOpacity
            style={[
              styles.createButton,
              ,
              { backgroundColor: this.state.color },
            ]}
            onPress={this.createList}
          >
            <Text style={styles.createText}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
