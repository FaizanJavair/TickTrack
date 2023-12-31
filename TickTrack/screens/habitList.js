import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import HabitModal from "../modals/habitModal";

// Renders all the habits on the habit.js
export default class HabitList extends React.Component {
  state = {
    listVisible: false,
  };
  // Toggling the next modal which is the viewing the individual habit
  toggleModal() {
    this.setState({ listVisible: !this.state.listVisible });
  }
  // Habit priority tags
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
  render() {
    // Getting the habit from props
    const habit = this.props.habit;
    var start = habit.startDate;

    // Setting up appropriate dates using unix time
    const s = new Date(start.seconds * 1000);
    const startDate = s.toLocaleString();
    const t = new Date();
    var diffInTime = (t.getTime() - s.getTime()) / 1000;

    // Handles difference of days, and hours spent for breaking habit
    const diffInDays = Math.floor(diffInTime / 86400);

    diffInTime -= diffInDays * 86400;
    const hours = Math.floor(diffInTime / 3600) % 24;

    const history = [];

    // Reversing the habit history to view it from recent to oldest
    habit.history
      .slice()
      .reverse()
      .forEach((x) => {
        history.push(x);
      });

    //Rendering the the Habits and Toggling HabitModal which shows individual Habit
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.listVisible}
          s
          onRequestClose={() => this.toggleModal()}
        >
          <HabitModal
            habit={habit}
            history={history}
            updateHabit={this.props.updateHabit}
            deleteHabit={this.props.deleteHabit}
            editHabit={this.props.editHabit}
            closeModal={() => this.toggleModal()}
          ></HabitModal>
        </Modal>
        <View style={[styles.card, { backgroundColor: habit.color }]}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => this.toggleModal()}
          >
            <View>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {habit.name}
              </Text>
              {habit.habitType == "Break" ? (
                <Text style={styles.streakTitle}>
                  Streak of {diffInDays} days & {hours} hours
                </Text>
              ) : habit.habitType == "Make" ? (
                <Text style={styles.streakTitle}>
                  You Did The Habit {habit.history.length} Times
                </Text>
              ) : null}
            </View>

            <View style={{ flexDirection: "row" }}>
              {this.listTags(habit)}
              <View style={[styles.tags, { backgroundColor: "white" }]}>
                <Text style={[styles.subTitle, { color: "black" }]}>
                  Habit Type:
                </Text>
                <Text style={[styles.subTitle, { color: "black" }]}>
                  {habit.habitType}
                </Text>
              </View>
            </View>
            <Text style={styles.startDate}>Started at {startDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 350,
    borderRadius: 15,
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    marginVertical: "2.5%",
    height: 170,
  },
  title: {
    fontSize: 25,
    fontWeight: 300,
    marginBottom: "2%",
    color: "white",
  },
  tags: {
    flexDirection: "row",
    paddingHorizontal: "3%",
    paddingVertical: "2%",

    borderRadius: 10,
    marginBottom: "2%",
    marginEnd: "2%",
  },
  subTitle: {
    fontSize: 10,
    color: "white",
    fontWeight: "800",
  },
  startDate: {
    fontSize: 15,
    marginTop: "1%",
    color: "white",
    fontWeight: 300,
  },
  streakTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: "2%",
    color: "white",
  },
});
