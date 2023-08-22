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

export default function EditTaskModal(props) {
  const [taskName, setTaskName] = useState(props.task.title);
  const [oldName, setOldName] = useState(props.task.title);
  const [dueDateTime, setDueDateTime] = useState(props.task.dueDateTime);
  const due = new Date(dueDateTime.seconds * 1000);
  const [date, setDate] = useState(due);
  const [text, setText] = useState(props.task.text);
  const [show, setShow] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDateTime = selectedDate;

    let tempDate = new Date(currentDateTime);
    setShow(Platform.OS === "ios");
    setDate(tempDate);
    setDueDateTime(currentDateTime);

    let ds = tempDate.getTime() / 1000;
    console.log(ds);
    let t = moment.unix(ds).format("DD/MM/YYYY");
    let ft = moment.unix(ds).format("h:mm a");

    setText(t + " | " + ft);
  };
  const showMode = () => {
    setShow(!show);
  };

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
