import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import dataTemp from "../data";
export default class ListModal extends React.Component {
  // Black,
  colors = [
    "#000000",
    "#28282B",
    "#36454F",
    "#414a4c",
    "#71797E",
    "#708090",
    "#B2BEB5",
  ];

  state = {
    name: "",
    color: this.colors[0],
  };

  createList = () => {
    const { name, color } = this.state;
    dataTemp.push({
      name,
      color,
      todos: [],
    });

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
          <Text style={styles.title}>Create Your Task List</Text>
          <TextInput
            style={styles.listInput}
            placeholder="Give Your Task List a Name!"
            placeholderTextColor={"gray"}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View style={styles.colorView}>{this.renderColors()}</View>
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
});
