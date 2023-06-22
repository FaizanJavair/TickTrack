import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import TaskModal from "./taskModal";
export default class TodoList extends React.Component {
  state = {
    listVisible: false,
  };
  toggleListModal() {
    this.setState({ listVisible: !this.state.listVisible });
  }
  render() {
    const list = this.props.list;

    const completed = list.todos.filter((todo) => todo.completed).length;
    const remaining = list.todos.length - completed;

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
          ></TaskModal>
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle}>{list.name}</Text>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remaining}</Text>
              <Text style={styles.subTitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completed}</Text>
              <Text style={styles.subTitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

styles = StyleSheet.create({
  listContainer: {
    width: 350,
    borderRadius: 15,
    padding: "8%",
    marginVertical: "2.5%",
    alignItems: "center",
    height: 250,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  count: {
    fontSize: 48,
    color: "white",
    fontWeight: "200",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
});
