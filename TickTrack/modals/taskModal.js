import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddTask from "./addTaskModal";
import EditListModal from "./editListModal";
import EditTaskModal from "./editTaskModal";
export default class TaskModal extends React.Component {
  state = {
    addVisible: false,
    editTodo: false,
    editTask: false,
  };
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

  deleteTask = (index) => {
    let list = this.props.list;
    return Alert.alert(
      "Deleting Task",
      "This action is not reversible, are you sure you want to delete the task?",
      [
        {
          text: "Yes",
          onPress: () => {
            list.todos.splice(index, 1);
            this.props.updateList(list);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  renderRemainingTask = (task, index) => {
    if (!task.completed) {
      return (
        <View style={styles.tasks}>
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
            <View style={{ flexDirection: "row" }}>
              <View
                style={[
                  styles.tags,
                  { backgroundColor: this.props.list.color },
                ]}
              >
                <TouchableOpacity onPress={() => this.deleteTask(index)}>
                  <Ionicons name={"trash-outline"} size={22} color={"white"} />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.tags,
                  { backgroundColor: this.props.list.color, marginEnd: 0 },
                ]}
              >
                <TouchableOpacity onPress={() => this.toggleTaskModal()}>
                  <Ionicons name={"pencil"} size={22} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  deleteList = (list) => {
    return Alert.alert(
      "Deleting Task List",
      "This action is not reversible, are you sure you want to delete the list?",
      [
        {
          text: "Yes",
          onPress: () => this.props.deleteList(list),
        },
        {
          text: "No",
        },
      ]
    );
  };
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
              keyExtractor={(item) => item.title}
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
              keyExtractor={(item) => item.title}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginLeft: "5%",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderBottomWidth: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 25,
    width: 300,
  },
  subTitle: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  tasks: {
    flexDirection: "row",
    paddingVertical: "5%",
    alignItems: "center",
  },
  taskText: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: "3%",
    marginTop: "1%",
  },
  listTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    borderBottomWidth: 1,
  },
  footer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    borderRadius: 12,
    padding: 12,
    width: "80%",
    height: "5%",
  },
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    top: "95%",
    right: 20,
    height: 65,
    borderRadius: 100,
  },

  taskRow: {
    flexDirection: "row",
    width: "92%",
    padding: 1,
    justifyContent: "space-between",
  },
  subSection: {
    flexDirection: "row",
  },
  tags: {
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    marginTop: "1%",
    borderRadius: 8,
    marginEnd: "2%",
  },
});
