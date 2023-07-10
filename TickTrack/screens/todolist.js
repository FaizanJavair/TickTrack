import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import TaskModal from "../modals/taskModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { ScrollView } from "react-native";
export default class TodoList extends React.Component {
  state = {
    listVisible: false,
  };
  toggleListModal() {
    this.setState({ listVisible: !this.state.listVisible });
  }
  toggleTask = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };

  renderRemainingTask = (task, index) => {
    if (!task.completed) {
      return (
        <View style={styles.tasks}>
          <TouchableOpacity onPress={() => this.toggleTask(index)}>
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={25}
              color={"white"}
            />
          </TouchableOpacity>
          <View style={styles.taskRow}>
            <Text style={[styles.taskText]}>{task.title}</Text>
          </View>
        </View>
      );
    }
  };
  renderList(size, list, remaining) {
    if (size == 0 || remaining == 0) {
      return (
        <View>
          <Text style={styles.muted}>Wow Such Empty!</Text>
          <Text style={styles.muted}>Try Adding a New Task.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <FlatList
            data={list.todos}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: "5%",
              paddingVertical: "2%",
            }}
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              this.renderRemainingTask(item, index)
            }
          />
        </View>
      );
    }
  }
  render() {
    const list = this.props.list;
    const todo_size = list.todos.length;
    const completed = list.todos.filter((todo) => todo.completed).length;
    const remaining = list.todos.length - completed;
    const total = list.todos.length;

    if (todo_size == 0) {
      ratio = 0;
    } else {
      ratio = completed / total;
    }

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.listVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TaskModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          ></TaskModal>
        </Modal>
        <View style={[styles.listContainer, { backgroundColor: list.color }]}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => this.toggleListModal()}
          >
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>{list.name}</Text>
              <View style={styles.listsubTitle}>
                <Ionicons
                  name="checkbox"
                  size={24}
                  color={"white"}
                  style={{ marginTop: "5%" }}
                />
                <Text style={styles.count}>
                  {completed}/{total}
                </Text>
              </View>
            </View>
            <View>
              <Progress.Bar progress={ratio} width={300} color="white" />
            </View>
            <View>
              <View style={styles.remainView}>
                <Text style={styles.remainText}>Remaining Tasks</Text>
              </View>
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.renderList(todo_size, list, remaining)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  listContainer: {
    width: 350,
    borderRadius: 15,
    paddingTop: "8%",
    paddingHorizontal: "8%",
    marginVertical: "2.5%",
    height: 250,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  count: {
    fontSize: 24,
    color: "white",
    fontWeight: "200",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listsubTitle: {
    flexDirection: "row",
    marginLeft: "4%",
  },

  remainText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    borderBottomColor: "white",
    marginTop: "2%",
    marginBottom: "2%",
  },
  remainView: {
    borderBottomWidth: 1,
    marginTop: "2%",
    marginBottom: "3%",
    borderColor: "white",
    width: 180,
  },
  tasks: {
    flexDirection: "row",
    paddingVertical: "2%",
    alignItems: "center",
  },
  taskText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: "1%",
    marginLeft: "3%",
    marginTop: "1%",
  },
  muted: {
    color: "gray",
    fontWeight: "500",
    fontSize: 15,
    marginTop: "1%",
  },
  taskRow: {
    flexDirection: "row",
    width: "92%",
    padding: 1,
    justifyContent: "space-between",
  },
});
