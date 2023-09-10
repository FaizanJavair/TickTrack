import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import TodoList from "./todolist";
import ListModal from "../modals/listModal";
import { auth, db } from "../database/firebase";

// Initial Home Screen to show all the task list
export default class Tasks extends React.Component {
  state = {
    addTodo: false,
    loading: true,
    lists: [],
  };
  // Gets the data from the DB if user is found and logged in
  subscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = db.collection("users").doc(user.uid).collection("lists");

      return ref;
    }
  };
  // Adds the add to the array to pass to different screens
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
        this.setState({
          lists: list,
          user: auth.currentUser.uid,
          loading: false,
        });
      });
    }
  };
  // Adding a new list
  addList = (list) => {
    let ref = this.subscribe();
    ref.add(list);
  };
  // Deleting existing List
  deleteList = (list) => {
    let ref = this.subscribe();
    ref.doc(list.id).delete();
  };
  // Updating List
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
  // Toggling thre modal that renders individual lists
  toggleModal = () => {
    this.setState({ addTodo: !this.state.addTodo });
  };
  // This function is called to Display each list
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
  // This call the previous addList to add the new list to the db
  addTask = (list) => {
    this.addList({
      name: list.name,
      color: list.color,
      priority: list.priority,
      priorityValue: list.priorityValue,
      todos: [],
    });
  };
  // Calls the previous UpdateTask
  updateList = (list) => {
    this.updateTask(list);
  };
  // Edit list Handler
  editList = (list) => {
    let ref = this.subscribe();

    ref.doc(list.id).update(list);
  };
  // Rendering the page and calling the component to render all the lists
  render() {
    if (this.state.loading == true) {
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: "80%" }} color={"black"} />
      </View>;
    } else {
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
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  floatingButton: {
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
