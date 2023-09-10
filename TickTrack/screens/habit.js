import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddHabitModal from "../modals/addHabitModal";
import HabitList from "./habitList";
import { auth, db } from "../database/firebase";

// Habit screen that handles getting the data and display all the habits
export default class Habits extends React.Component {
  state = {
    addHabit: false,
    loading: true,
    habits: [],
  };
  // Gets the habits if the user is logged in
  subscribe = () => {
    let user = auth.currentUser;
    if (user) {
      let ref = db.collection("users").doc(user.uid).collection("habits");

      return ref;
    }
  };
  // gets the data from the habits and adds it to the array
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

        this.setState({ habits: habit, loading: false });
      });
    }
  };

  componentDidMount = () => {
    this.unsubscribe();
  };
  componentWillUnmount = () => {
    this.unsubscribe();
  };
  // Toggling the the modal
  toggleModal = () => {
    this.setState({ addHabit: !this.state.addHabit });
  };
  // Called to render all the habits by sending it the habits array
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
  // Adds a new habit in the list
  addList = (habit) => {
    let ref = this.subscribe();
    ref.add(habit);
  };
  // This calls the previous addList function and passes the appropriate values
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
  // Updating the data
  updateHabitData = (habit) => {
    let ref = this.subscribe();
    ref.doc(habit.id).update(habit);
  };
  updateHabit = (habit) => {
    this.updateHabitData(habit);
  };
  // Deleting the data
  deleteHabit = (habit) => {
    let ref = this.subscribe();
    ref.doc(habit.id).delete();
  };
  // Editing the habit
  editHabit = (habit) => {
    let ref = this.subscribe();

    ref.doc(habit.id).update(habit);
  };
  // Rendering habit home page which eventually also calls the modal
  render() {
    if (this.state.loading == true) {
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ marginTop: "20%" }} color={"black"} />
      </SafeAreaView>;
    } else {
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
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
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
