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
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../css/editTaskModalStyle";
import moment from "moment";

// Editing the tasks in the list Screen
export default function EditTaskModal(props) {
  const [taskName, setTaskName] = useState(props.task.title);
  const [oldName, setOldName] = useState(props.task.title);
  const [dueDateTime, setDueDateTime] = useState(props.task.dueDateTime);
  const due = new Date(dueDateTime.seconds * 1000);
  const [date, setDate] = useState(due);
  const [text, setText] = useState(props.task.text);
  const [show, setShow] = useState(false);
  // Calling the update function when submitted
  const update = () => {
    const list = props.list;
    let todo = {};
    if (taskName == "") {
      todo = {
        id: props.task.id,
        title: oldName,
        dueDateTime: dueDateTime,
        text: text,
        completed: props.task.completed,
      };
    } else {
      todo = {
        id: props.task.id,
        title: taskName,
        dueDateTime: dueDateTime,
        text: text,
        completed: props.task.completed,
      };
    }

    list.todos[props.index] = todo;
    props.updateList(list);
    props.closeModal;
    Keyboard.dismiss();
    return Alert.alert("Task Updated", "Congrats! Your changes are saved.", [
      {
        text: "OK",
        onPress: props.closeModal,
      },
    ]);
  };

  // Onchange function handling dates
  const onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate;

    let tempDate = new Date(currentDateTime);
    setShow(Platform.OS === "ios");
    setDate(tempDate);
    setDueDateTime(currentDateTime);

    let ds = tempDate.getTime() / 1000;

    let t = moment.unix(ds).format("DD/MM/YYYY");
    let ft = moment.unix(ds).format("h:mm a");

    setText(t + " | " + ft);
  };
  const showMode = () => {
    setShow(!show);
  };
  // Rendering the Form to update the task
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.closeButton} onPress={props.closeModal}>
        <Ionicons name="close-outline" size={30} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Your Task</Text>
        <TextInput
          style={styles.listInput}
          value={taskName}
          placeholderTextColor={"gray"}
          onChangeText={(text) => setTaskName(text)}
        />
        <View>
          <View style={{ flexDirection: "row", marginTop: "3%" }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: props.list.color }]}
              onPress={() => setShow(!show)}
            >
              <Text style={styles.dateText}>Due Date & Time</Text>
            </TouchableOpacity>
            <Text style={styles.date}>{text}</Text>
          </View>

          {show && (
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
                value={date}
                mode="datetime"
                is24Hour={true}
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChange}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.createButton, , { backgroundColor: props.list.color }]}
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
