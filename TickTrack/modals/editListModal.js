import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "../css/editListModalStyle";
// Editting the list modal
export default function EditListModal(props) {
  const [listName, setListName] = useState(props.list.name);
  const [oldName, setOldName] = useState(props.list.name);
  const [priority, setPriority] = useState(props.list.priority);
  const [priorityValue, setPriorityValue] = useState(props.list.priorityValue);
  const [open, setOpen] = useState(false);
  // Items for drop down picker
  items = [
    { label: "Critical", value: "1" },
    { label: "High", value: "2" },
    { label: "Medium", value: "3" },
    { label: "Low", value: "4" },
  ];
  // Update function called when data updated
  const update = () => {
    let list;
    if (listName == "") {
      list = {
        name: oldName,
        id: props.list.id,
        priority: priority,
        priorityValue: priorityValue,
      };
    } else {
      list = {
        name: listName,
        id: props.list.id,
        priority: priority,
        priorityValue: priorityValue,
      };
    }
    props.editList(list);

    Keyboard.dismiss();
    return Alert.alert("Habit Updated", "Congrats! Your changes are saved", [
      {
        text: "OK",
        onPress: props.closeModal,
      },
    ]);
  };

  // Rendering the form to update the list
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={styles.closeButton} onPress={props.closeModal}>
        <Ionicons name="close-outline" size={30} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Your Task List</Text>
        <TextInput
          style={styles.listInput}
          value={listName}
          placeholderTextColor={"gray"}
          onChangeText={(text) => setListName(text)}
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
