import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EditHabitModal(props) {
  const [habitName, setHabitName] = useState(props.habit.name);
  const [priority, setPriority] = useState(props.habit.priority);
  const [priorityValue, setPriorityValue] = useState(props.habit.priorityValue);
  const [open, setOpen] = useState(false);
  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];
  const update = () => {
    const habit = {
      name: habitName,
      id: props.habit.id,
      priority: priority,
      priorityValue: priorityValue,
    };

    props.editHabit(habit);

    Keyboard.dismiss();
    return Alert.alert(
      "Task List Updated",
      "Congrats! Your changes are saved",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: props.closeModal,
        },
      ]
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.closeButton} onPress={props.closeModal}>
        <Ionicons name="close-outline" size={30} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Your Habit!</Text>
        <TextInput
          style={styles.listInput}
          value={habitName}
          placeholderTextColor={"gray"}
          onChangeText={(text) => setHabitName(text)}
        />

        <DropDownPicker
          style={styles.picker}
          open={open}
          value={priorityValue}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          items={items}
          onSelectItem={(value) => {
            setPriority(value.label);
            setPriorityValue(value.value);
          }}
        />
        <TouchableOpacity
          style={[
            styles.createButton,
            ,
            { backgroundColor: props.habit.color },
          ]}
          onPress={() => {
            update();
          }}
        >
          <Text style={styles.createText}>Update</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
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
