import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import EditHabitModal from "./editHabitModal";
import { min } from "moment";

export default class HabitModal extends React.Component {
  state = {
    editHabit: false,
  };

  toggleModal = () => {
    this.setState({ editHabit: !this.state.editHabit });
  };

  deleteHabit = (habit) => {
    return Alert.alert(
      "Deleting Habit",
      "This action is not reversible, are you sure you want to delete the habit?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            this.props.deleteHabit(habit);
          },
        },
      ]
    );
  };
  relapse = () => {
    const habit = this.props.habit;
    const newDate = new Date();
    habit.history.push({
      id: uuid.v1(),
      end: newDate,
      start: habit.startDate,
    });
    return Alert.alert(
      "Did You Relapse?",
      "Are you sure you want to Relapse soo soon?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            habit.startDate = newDate;
            this.props.editHabit(habit);
          },
        },
      ]
    );
  };
  addToCounter = () => {
    const habit = this.props.habit;
    const newDate = new Date();
    habit.history.push({
      id: uuid.v1(),
      end: newDate,
      start: habit.startDate,
    });
    return Alert.alert(
      "Great, you did the habit!",
      "Are you sure you want to add to the counter?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            this.props.editHabit(habit);
          },
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
            <Text style={styles.subTitle}>Priority: </Text>
            <Text style={styles.subTitle}>{list.priority}</Text>
          </View>
        );
      }
    }
  };
  renderHistory(habit, index) {
    var start = habit.start;
    var end = habit.end;
    const s = new Date(start.seconds * 1000);
    const startDate = s.toLocaleString();
    const t = new Date(end.seconds * 1000);
    const endDate = t.toLocaleString();
    var diffInTime = (t.getTime() - s.getTime()) / 1000;

    console.log(start);
    console.log(end);
    const diffInDays = Math.floor(diffInTime / 86400);

    diffInTime -= diffInDays * 86400;

    const hours = Math.floor(diffInTime / 3600) % 24;

    diffInTime -= hours * 3600;

    const minutes = Math.floor(diffInTime / 60) % 60;

    const type = this.props.habit.habitType;
    const color = this.props.habit.color;

    if (type == "Break") {
      return (
        <View style={[styles.listCard, { borderColor: color, borderWidth: 1 }]}>
          <Text style={styles.historyTitle}>Your Streak Lasted:</Text>
          {diffInDays === 0 ? (
            <View>
              <Text style={styles.historyMainText}>
                {hours} Hours & {minutes} Minutes
              </Text>
              <Text style={styles.historyDate}>Started At: {startDate}</Text>
              <Text style={styles.historyDate}>Ended At: {endDate}</Text>
            </View>
          ) : diffInDays !== 0 ? (
            <View>
              <Text style={styles.historyMainText}>
                {diffInDays} Days, {hours} Hours & {minutes} Minutes
              </Text>
              <Text style={styles.historyDate}>Started At: {startDate}</Text>
              <Text style={styles.historyDate}>Ended At: {endDate}</Text>
            </View>
          ) : null}
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.listCard,
            { borderColor: color, borderWidth: 1, height: 80 },
          ]}
        >
          <Text style={[styles.historyTitle]}>You Last Did the Habit At:</Text>
          <Text style={styles.endDate}>{endDate}</Text>
        </View>
      );
    }
  }
  render() {
    const habit = this.props.habit;
    var start = habit.startDate;

    const relapse = habit.history.length;

    const s = new Date(start.seconds * 1000);
    const startDate = s.toLocaleString();
    console.log(s);
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.editHabit}
          onRequestClose={() => this.toggleModal()}
        >
          <EditHabitModal
            habit={this.props.habit}
            closeModal={() => this.toggleModal()}
            editHabit={this.props.editHabit}
          />
        </Modal>
        <View
          style={[
            styles.header,
            {
              alignSelf: "stretch",
              borderBottomColor: habit.color,
            },
          ]}
        >
          <View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              Habit Info
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.closeModal}
            >
              <Ionicons name="close-outline" size={40} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.card}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {habit.name}
            </Text>

            <Text style={styles.date}>Start Date: {startDate}</Text>
            {habit.habitType == "Break" ? (
              <Text style={styles.relapse}>You Relapsed {relapse} Times</Text>
            ) : habit.habitType == "Make" ? (
              <Text style={styles.relapse}>
                You Did The Habit {relapse} Times
              </Text>
            ) : null}

            <View style={{ flexDirection: "row" }}>
              {this.listTags(habit)}
              <View style={[styles.tags, { backgroundColor: habit.color }]}>
                <Text style={styles.subTitle}>Habit Type: </Text>
                <Text style={styles.subTitle}>{habit.habitType}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.toggleModal()}
              >
                <Ionicons
                  name={"pencil"}
                  size={20}
                  style={styles.icons}
                  color={habit.color}
                />
                <Text style={[styles.buttonText, { color: habit.color }]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.deleteHabit(habit)}
              >
                <View>
                  <Ionicons
                    name={"trash"}
                    size={18}
                    style={styles.icons}
                    color={"red"}
                  />
                </View>

                <Text style={[styles.buttonText, { color: "red" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.historyCard}>
            <Text
              style={[
                styles.listTitle,
                {
                  color: habit.color,
                },
              ]}
            >
              History
            </Text>
            <FlatList
              data={this.props.history}
              renderItem={({ item, index }) => this.renderHistory(item, index)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: "5%",
                paddingVertical: "2%",
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            {habit.habitType == "Break" ? (
              <TouchableOpacity
                style={[styles.createButton, { backgroundColor: habit.color }]}
                onPress={() => this.relapse()}
              >
                <Text style={styles.createText}>Relapse</Text>
              </TouchableOpacity>
            ) : habit.habitType == "Make" ? (
              <TouchableOpacity
                style={[styles.createButton, { backgroundColor: habit.color }]}
                onPress={() => this.addToCounter()}
              >
                <Text style={styles.createText}>Add To Counter</Text>
              </TouchableOpacity>
            ) : null}
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
  },
  title: {
    fontWeight: "600",
    fontSize: 25,
    marginTop: "2%",
    width: 300,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingTop: "20%",
    paddingBottom: "2%",
    borderBottomWidth: 10,
  },
  closeButton: {
    marginLeft: "5%",
  },
  card: {
    width: 350,
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    marginTop: "2.5%",
    height: 220,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
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
    fontSize: 12,
    color: "white",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  date: {
    fontSize: 19,
    fontWeight: "200",
    marginVertical: "2%",
  },
  relapse: {
    fontSize: 19,
    fontWeight: "600",
    marginBottom: "3%",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    marginTop: "7%",
  },
  button: {
    flexDirection: "row",
  },
  buttonText: { fontSize: 18, marginLeft: "3%" },
  listTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    borderBottomWidth: 1,
  },
  historyCard: {
    backgroundColor: "white",
    height: "50%",
    marginTop: "2.5%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  createText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  createButton: {
    marginTop: "6%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  listCard: {
    width: 310,
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    marginTop: "2%",
    height: 100,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 200,
  },
  historyMainText: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: "2%",
    marginTop: "1%",
  },
  historyDate: {
    fontSize: 12,
    fontWeight: 300,
  },
  endDate: {
    fontSize: 18,

    marginTop: "2%",
    fontWeight: 400,
  },
});
