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
import { styles } from "../css/editHabitModalStyle";
// Editing the habit modal form
export default function EditHabitModal(props) {
  const [habitName, setHabitName] = useState(props.habit.name);
  const [priority, setPriority] = useState(props.habit.priority);
  const [priorityValue, setPriorityValue] = useState(props.habit.priorityValue);
  const [open, setOpen] = useState(false);
  // Drop down picker items
  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];
  // Calling update function to update the data once submitted
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
          text: "OK",
          onPress: props.closeModal,
        },
      ]
    );
  };
  // Rendering the Form
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
