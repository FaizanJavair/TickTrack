import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";

import TodoList from "./todolist";
import ListModal from "../modals/listModal";

import { auth, db } from "../database/firebase";

export default class Tasks extends React.Component {
  state = {
    addTodo: false,
    lists: [],
  };
  subscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = db.collection("users").doc(user.uid).collection("lists");

      return ref;
    }
  };
  unsubscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = this.subscribe();
      ref.orderBy("priorityValue", "asc").onSnapshot((snapshot) => {
        const list = [];
        if (snapshot) {
          snapshot.forEach(async (doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
        }
        this.setState({ lists: list, user: auth.currentUser.uid });
      });
    }
  };
  addList = (list) => {
    let ref = this.subscribe();
    ref.add(list);
  };
  deleteList = (list) => {
    let ref = this.subscribe();
    ref.doc(list.id).delete();
  };
  updateTask = (list) => {
    let ref = this.subscribe();
    ref.doc(list.id).update(list);
  };
  componentDidMount = () => {
    this.unsubscribe();
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  toggleModal = () => {
    this.setState({ addTodo: !this.state.addTodo });
  };
  renderTasks = (task) => {
    return (
      <TodoList
        list={task}
        updateList={this.updateList}
        deleteList={this.deleteList}
        editList={this.editList}
      ></TodoList>
    );
  };
  addTask = (list) => {
    this.addList({
      name: list.name,
      color: list.color,
      priority: list.priority,
      priorityValue: list.priorityValue,
      todos: [],
    });
  };

  updateList = (list) => {
    this.updateTask(list);
  };
  editList = (list) => {
    let ref = this.subscribe();

    ref.doc(list.id).update(list);
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Modal
          animationType="slide"
          visible={this.state.addTodo}
          onRequestClose={() => this.toggleModal()}
        >
          <ListModal
            closeModal={() => this.toggleModal()}
            addTask={this.addTask}
          />
        </Modal>
        <FlatList
          data={this.state.lists}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({ item }) => this.renderTasks(item)}
          keyboardShouldPersistTaps="always"
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => this.toggleModal()}
        >
          <AntDesign name="plus" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    top: "88%",
    right: 10,
    height: 65,
    backgroundColor: "black",
    borderRadius: 100,
  },
});
