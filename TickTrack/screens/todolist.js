import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import TaskModal from "../modals/taskModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { ScrollView } from "react-native";
import { styles } from "../css/todoListStyle";

// Shows the individual List on the homescreen
export default class TodoList extends React.Component {
  state = {
    listVisible: false,
  };
  toggleListModal() {
    this.setState({ listVisible: !this.state.listVisible });
  }
  // Toggles the task as completed or Uncompleted
  toggleTask = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  // Renders remianing tasks by flat list
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
  // Renders the remaining tasks in home page in the card
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
  // Displays priority tags
  listTags = (list) => {
    tagColor = [
      { label: "Critical", value: "red" },
      { label: "High", value: "orange" },
      { label: "Medium", value: "green" },
      { label: "Low", value: "#0096FF" },
    ];
    for (i = 0; i < tagColor.length; i++) {
      if (tagColor[i].label == list.priority) {
        return (
          <View style={[styles.tags, { backgroundColor: tagColor[i].value }]}>
            <Text style={styles.subTitle}>Priority: </Text>
            <Text style={styles.subTitle}>{list.priority}</Text>
          </View>
        );
      }
    }
  };
  // Renders the card for each list
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
          s
          onRequestClose={() => this.toggleListModal()}
        >
          <TaskModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
            deleteList={this.props.deleteList}
            editList={this.props.editList}
          ></TaskModal>
        </Modal>
        <View style={[styles.listContainer, { backgroundColor: list.color }]}>
          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => this.toggleListModal()}
          >
            <View style={styles.listHeader}>
              <Text
                style={styles.listTitle}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {list.name}
              </Text>

              <View style={styles.listsubTitle}>
                <Ionicons
                  name="checkbox"
                  size={20}
                  color={"white"}
                  style={{ marginTop: "5%" }}
                />
                <Text style={styles.count}>
                  {completed}/{total}
                </Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                {this.listTags(list)}
              </View>

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
