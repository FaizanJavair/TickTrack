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

export default class AddHabitModal extends React.Component {
  colors = [
    "#000000",
    "#28282B",
    "#36454F",
    "#414a4c",
    "#71797E",
    "#708090",
    "#B2BEB5",
  ];

  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];

  //   itemhabit = [
  //     { label: "Critical", value: "1" },
  //     { label: "High", value: "2" },
  //     { label: "Medium", value: "3" },
  //     { label: "Low", value: "4" },
  //   ];

  state = {
    name: "",
    color: this.colors[0],
    open: false,
    value: null,
    priority: "Low",
    priorityValue: "4",
    habitType: "break",
  };

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
            onSelectItem={(value) => this.setState({ priority: value.label })}
            placeholder={this.state.priority}
            // setValue={(value) => this.setState({ priority: value })}
          />

          <TouchableOpacity
            style={[
              styles.createButton,
              ,
              { backgroundColor: this.state.color },
            ]}
            onPress={this.createHabit}
          >
            <Text style={styles.createText}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: "7%",
    left: "7%",
  },
  header: {
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginBottom: "5%",
  },
  listInput: {
    borderColor: "#dadae8",
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: "2%",
  },
  createText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  createButton: {
    marginTop: "6%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  colorOptions: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  colorView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "6%",
  },
  picker: {
    marginTop: "5%",
    borderColor: "#dadae8",
    borderStyle: "solid",
    borderWidth: 1.5,
    borderRadius: 12,
  },
});
