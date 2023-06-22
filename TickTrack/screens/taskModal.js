import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default class TaskModal extends React.Component {
  state = {
    name: this.props.list.name,
    color: this.props.list.color,
    todos: this.props.list.todos,
  };
  renderCompletedTask = (task) => {
    if (task.completed) {
      return (
        <View style={styles.tasks}>
          <TouchableOpacity>
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={25}
              color={this.props.list.color}
            />
          </TouchableOpacity>
          <Text style={[styles.taskText, {}]}>{task.title}</Text>
        </View>
      );
    }
  };
  renderRemainingTask = (task) => {
    if (!task.completed) {
      return (
        <View style={styles.tasks}>
          <TouchableOpacity>
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={25}
              color={this.props.list.color}
            />
          </TouchableOpacity>
          <Text style={[styles.taskText, {}]}>{task.title}</Text>
        </View>
      );
    }
  };
  render() {
    const list = this.props.list;
    const total = this.state.todos.length;
    const completed = list.todos.filter((todo) => todo.completed).length;

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.header,
            {
              alignSelf: "stretch",
              borderBottomColor: this.state.color,
            },
          ]}
        >
          <View>
            <Text style={styles.title}>{this.state.name}</Text>
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
            <Text style={[styles.listTitle, { color: this.state.color }]}>
              Remaining
            </Text>
            <FlatList
              data={this.state.todos}
              renderItem={({ item }) => this.renderRemainingTask(item)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
              style={{ flexGrow: 0 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={[styles.listTitle, { color: this.state.color }]}>
              Completed
            </Text>
            <FlatList
              style={{ flexGrow: 0 }}
              data={this.state.todos}
              renderItem={({ item }) => this.renderCompletedTask(item)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
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
  },
  listTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginTop: "2%",
    marginLeft: "5%",
  },
});
