import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddHabitModal from "../modals/addHabitModal";
import HabitList from "./habitList";
import { auth, db } from "../database/firebase";

export default class Habits extends React.Component {
  state = {
    addHabit: false,
    habits: [],
  };

  subscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = db.collection("users").doc(user.uid).collection("habits");

      return ref;
    }
  };
  unsubscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = this.subscribe();
      ref.orderBy("priorityValue", "asc").onSnapshot((snapshot) => {
        const habit = [];
        if (snapshot) {
          snapshot.forEach(async (doc) => {
            habit.push({ id: doc.id, ...doc.data() });
          });
        }

        this.setState({ habits: habit });
      });
    }
  };

  componentDidMount = () => {
    this.unsubscribe();
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  toggleModal = () => {
    this.setState({ addHabit: !this.state.addHabit });
  };

  renderHabits = (habit) => {
    return (
      <HabitList
        habit={habit}
        updateHabit={this.updateHabit}
        deleteHabit={this.deleteHabit}
        editHabit={this.editHabit}
      ></HabitList>
    );
  };

  addList = (habit) => {
    let ref = this.subscribe();
    ref.add(habit);
  };

  addHabit = (habit) => {
    let date = new Date();

    this.addList({
      name: habit.name,
      color: habit.color,
      priority: habit.priority,
      priorityValue: habit.priorityValue,
      habitType: habit.habitType,
      startDate: date,
      history: [],
    });
  };
  updateHabitData = (habit) => {
    let ref = this.subscribe();
    ref.doc(habit.id).update(habit);
  };
  updateHabit = (habit) => {
    this.updateHabitData(habit);
  };
  deleteHabit = (habit) => {
    let ref = this.subscribe();
    ref.doc(habit.id).delete();
  };
  editHabit = (habit) => {
    let ref = this.subscribe();

    ref.doc(habit.id).update(habit);
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.addHabit}
          onRequestClose={() => this.toggleModal()}
        >
          <AddHabitModal
            closeModal={() => this.toggleModal()}
            addHabit={this.addHabit}
          />
        </Modal>
        <FlatList
          data={this.state.habits}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({ item }) => this.renderHabits(item)}
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

const styles = StyleSheet.create({
  floatingButton: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    top: 590,
    right: 10,
    height: 65,
    backgroundColor: "black",
    borderRadius: 100,
  },
});
