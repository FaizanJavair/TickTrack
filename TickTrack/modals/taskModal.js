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
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddTask from "./addTaskModal";
export default class TaskModal extends React.Component {
  state = {
    addVisible: false,
  };
  toggleAddModal() {
    this.setState({ addVisible: !this.state.addVisible });
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
    list.todos.splice(index, 1);
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
              color={this.props.list.color}
            />
          </TouchableOpacity>
          <View style={styles.taskRow}>
            <Text style={[styles.taskText, { color: this.state.color }]}>
              {task.title}
            </Text>
            <TouchableOpacity onPress={() => this.deleteTask(index)}>
              <Ionicons
                name={"trash-outline"}
                size={24}
                color={this.props.list.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  render() {
    const list = this.props.list;

    const total = list.todos.length;
    const completed = list.todos.filter((todo) => todo.completed).length;

    return (
      <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.subTitle}>
              {completed}/{total} Tasks Completed
            </Text>
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
    fontSize: 35,
  },
  subTitle: {
    fontSize: 15,
    color: "gray",
    fontWeight: "400",
    marginVertical: "1%",
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
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    top: "95%",
    right: 20,
    height: 65,
    backgroundColor: "black",
    borderRadius: 100,
  },

  taskRow: {
    flexDirection: "row",
    width: "92%",
    padding: 1,
    justifyContent: "space-between",
  },
});
