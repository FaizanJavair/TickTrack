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
import dataTemp from "../data";
import Todolist from "./todolist";
import ListModal from "./listModal";

export default class Tasks extends React.Component {
  state = {
    addTodo: false,
  };
  toggleModal() {
    this.setState({ addTodo: !this.state.addTodo });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Modal
          animationType="slide"
          visible={this.state.addTodo}
          onRequestClose={() => this.toggleModal()}
        >
          <ListModal closeModal={() => this.toggleModal()} />
        </Modal>
        <FlatList
          data={dataTemp}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({ item }) => <Todolist list={item}></Todolist>}
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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    top: "88%",
    right: 10,
    height: 70,
    backgroundColor: "black",
    borderRadius: 100,
  },
});
