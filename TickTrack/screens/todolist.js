import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default TodoList = ({ list }) => {
  const completed = list.todos.filter((todo) => todo.completed).length;
  const remaining = list.todos.length - completed;
  return (
    <View style={[styles.listContainer, { backgroundColor: list.color }]}>
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
    </View>
  );
};

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
