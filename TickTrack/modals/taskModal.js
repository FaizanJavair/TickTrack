import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddTask from "./addTaskModal";
import EditListModal from "./editListModal";
import EditTaskModal from "./editTaskModal";
import moment from "moment-timezone";
import { styles } from "../css/taskModalStyle";
// Modal to view the list and all it's tasks
export default class TaskModal extends React.Component {
  // Setting states
  state = {
    addVisible: false,
    editTodo: false,
    editTask: false,
  };
  // Toggling each modal that is in the page
  toggleAddModal() {
    this.setState({ addVisible: !this.state.addVisible });
  }
  toggleModal = () => {
    this.setState({ editTodo: !this.state.editTodo });
  };
  toggleTaskModal() {
    this.setState({ editTask: !this.state.editTask });
  }
  toggleTask = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;
    this.props.updateList(list);
  };
  // Renders the list of completed tasks in the list
  renderCompletedTask = (task, index) => {
    if (task.completed) {
      return (
        <View style={styles.tasks}>
          <TouchableOpacity onPress={() => this.toggleTask(index)}>
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={25}
              color={this.props.list.color}
            />
          </TouchableOpacity>
          <View style={styles.taskRow}>
            <Text
              style={[
                styles.taskText,
                { textDecorationLine: "line-through", color: this.state.color },
              ]}
            >
              {task.title}
            </Text>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => this.deleteTask(index)}
            >
              <Ionicons
                name={"trash-outline"}
                size={25}
                color={this.props.list.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  // Handles the deleting of task
  deleteTask = (index) => {
    let list = this.props.list;
    return Alert.alert(
      "Deleting Task",
      "This action is not reversible, are you sure you want to delete the task?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            list.todos.splice(index, 1);
            this.props.updateList(list);
          },
        },
      ]
    );
  };
  // Renders Remaining tasks in the list
  renderRemainingTask = (task, index) => {
    let fDate;
    let fTime;
    if (task.dueDateTime !== "") {
      const dueDate = new Date(task.dueDateTime.seconds * 1000);

      fDate = moment.unix(task.dueDateTime.seconds).format("DD/MM/YYYY");
      fTime = moment.unix(task.dueDateTime.seconds).format("h:mm A");
    } else {
      fDate = "None";
      fTime = "None";
    }

    if (!task.completed) {
      return (
        <View style={styles.tasksRemain}>
          <View>
            <Modal
              animationType="slide"
              visible={this.state.editTask}
              onRequestClose={() => this.toggleTaskModal()}
            >
              <EditTaskModal
                task={task}
                index={index}
                list={this.props.list}
                closeModal={() => this.toggleTaskModal()}
                updateList={this.props.updateList}
              />
            </Modal>
          </View>
          <View style={styles.taskCard}>
            <View style={styles.taskRow}>
              <TouchableOpacity onPress={() => this.toggleTask(index)}>
                <Ionicons
                  name={task.completed ? "checkbox" : "square-outline"}
                  size={25}
                  color={this.props.list.color}
                />
              </TouchableOpacity>

              <View style={styles.taskRow}>
                <Text style={[styles.taskText, { color: this.state.color }]}>
                  {task.title}
                </Text>
              </View>
            </View>
            <View style={styles.taskExtra}>
              <View style={{ marginBottom: "2%" }}>
                <Text style={styles.dueDate}>Due Date: {fDate}</Text>
                <Text style={styles.dueDate}>Time: {fTime}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={[
                    styles.editTag,
                    { backgroundColor: this.props.list.color },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                    onPress={() => this.deleteTask(index)}
                  >
                    <View>
                      <Ionicons
                        name={"trash-outline"}
                        size={18}
                        color={"white"}
                      />
                    </View>
                    <View style={styles.due}>
                      <Text style={styles.due}>Delete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.editTag,
                    { backgroundColor: this.props.list.color, marginEnd: 0 },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                    }}
                    onPress={() => this.toggleTaskModal()}
                  >
                    <View>
                      <Ionicons name={"pencil"} size={18} color={"white"} />
                    </View>
                    <View style={styles.due}>
                      <Text style={styles.due}>Edit Task</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  // handling the deleting of the list
  deleteList = (list) => {
    return Alert.alert(
      "Deleting Task List",
      "This action is not reversible, are you sure you want to delete the list?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => this.props.deleteList(list),
        },
      ]
    );
  };
  // Rendering the priority tags
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
            <Text style={styles.subTitle}>{list.priority}</Text>
          </View>
        );
      }
    }
  };
  // Rendering the List information Screen when the user clicks on any list on the home page
  render() {
    const list = this.props.list;

    const total = list.todos.length;
    const completed = list.todos.filter((todo) => todo.completed).length;

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="fade"
          visible={this.state.editTodo}
          onRequestClose={() => this.toggleModal()}
        >
          <EditListModal
            list={list}
            closeModal={() => this.toggleModal()}
            editList={this.props.editList}
          />
        </Modal>
        <View
          style={[
            styles.header,
            {
              alignSelf: "stretch",
              borderBottomColor: list.color,
            },
          ]}
        >
          <View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {list.name}
            </Text>
            <View style={styles.subSection}>
              <View style={[styles.tags, { backgroundColor: list.color }]}>
                <Text style={styles.subTitle}>
                  {completed}/{total} Tasks
                </Text>
              </View>

              {this.listTags(list)}
              <View style={[styles.tags, { backgroundColor: list.color }]}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => this.deleteList(list)}
                >
                  <Ionicons name="trash" color={"red"} size={12} />
                  <Text
                    style={[
                      styles.subTitle,
                      { color: "red", marginLeft: "1%" },
                    ]}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.tags, { backgroundColor: list.color }]}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => this.toggleModal()}
                >
                  <Ionicons name="pencil" color={"white"} size={12} />
                  <Text
                    style={[
                      styles.subTitle,
                      { color: "white", marginLeft: "2%" },
                    ]}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.closeModal}
            >
              <Ionicons name="arrow-back-outline" size={40} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <View>
            <Text style={[styles.listTitle, { color: list.color }]}>
              Remaining
            </Text>
            <FlatList
              data={list.todos}
              renderItem={({ item, index }) =>
                this.renderRemainingTask(item, index)
              }
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
              style={{ height: "50%" }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text
              style={[
                styles.listTitle,
                {
                  color: list.color,
                  borderBottomColor: list.color,
                },
              ]}
            >
              Completed
            </Text>
            <FlatList
              style={{ height: "42%" }}
              data={list.todos}
              renderItem={({ item, index }) =>
                this.renderCompletedTask(item, index)
              }
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          visible={this.state.addVisible}
          onRequestClose={() => this.toggleAddModal()}
        >
          <AddTask
            list={this.props.list}
            closeModal={() => this.toggleAddModal()}
            updateList={this.props.updateList}
          ></AddTask>
        </Modal>
        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: list.color }]}
          onPress={() => this.toggleAddModal()}
        >
          <MaterialIcons name="add-task" size={30} color={"white"} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
