import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../css/addHabitModalStyle";
// Adding a habit screen
export default class AddHabitModal extends React.Component {
  // Colors for user to pick
  colors = [
    "#000000",
    "#28282B",
    "#36454F",
    "#414a4c",
    "#71797E",
    "#708090",
    "#B2BEB5",
  ];
  // Setting values and labels for Dropdown picker
  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];
  // Types for dropdown picker
  types = [
    { label: "Break", value: "break" },
    { label: "Make", value: "make" },
  ];
  // Setting states
  state = {
    name: "",
    color: this.colors[0],
    open: false,
    habitOpen: false,
    value: null,
    priority: "Low",
    priorityValue: "4",
    habitType: "Break",
  };
  // Called when form submitted to create habit
  createHabit = () => {
    const { name, color, priority, priorityValue, habitType, history } =
      this.state;

    const habit = {
      name,
      color,
      priority,
      priorityValue,
      habitType,
    };
    this.props.addHabit(habit);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  // Renders the colors for user to choose
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
  // Renders the form to add a habit
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
          <Text style={styles.title}>Add Your Habit</Text>
          <TextInput
            style={styles.listInput}
            placeholder="Give Your Habit a Name!"
            placeholderTextColor={"gray"}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <DropDownPicker
            style={styles.picker}
            open={this.state.habitOpen}
            onOpen={() => this.setState({ habitOpen: true })}
            onClose={() => this.setState({ habitOpen: false })}
            items={this.types}
            onSelectItem={(value) => this.setState({ habitType: value.label })}
            placeholder={this.state.habitType}
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
            onPress={this.createHabit}
          >
            <Text style={styles.createText}>Start The Habit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
