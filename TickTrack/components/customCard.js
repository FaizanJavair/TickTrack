import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// Custom card used in the Daily and Hourly screen
const CustomCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.description}>
        <Text style={styles.listText}>
          {props.temperature}
          {props.tempUnit}
        </Text>

        <Text style={styles.descriptionSmall}>{props.description}</Text>
        <View style={styles.tempsDay}>
          <View style={styles.smallCardHead}>
            <Ionicons
              name={"water-outline"}
              size={16}
              color={"#36454F"}
              style={{ marginTop: 2, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>
              {props.desc1}
              {props.unit1}
            </Text>
          </View>
          <View style={styles.smallCardHead}>
            <Feather
              name={"cloud"}
              size={16}
              color={"#36454F"}
              style={{ marginTop: 2, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>
              {props.desc2}
              {props.unit2}
            </Text>
          </View>
        </View>
        <View style={styles.tempsDay}>
          <View style={styles.smallCardHead}>
            <MaterialCommunityIcons
              name={"weather-windy"}
              size={16}
              color={"#36454F"}
              style={{ marginTop: 2, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>
              {props.desc3}
              {props.unit3}
            </Text>
          </View>
          <View style={styles.smallCardHead}>
            <Octicons
              name={"meter"}
              size={14}
              color={"#36454F"}
              style={{ marginTop: 4, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>
              {props.desc4}
              {props.unit4}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.image}>
        <Image
          style={styles.icon}
          source={{
            uri: props.mainImg,
          }}
        />
        <Text style={styles.listTextSmall}>{props.dt}</Text>
      </View>
    </View>
  );
};
// Shared CSS for the customCard file which is used in Daily, and Hourly Screen
const styles = StyleSheet.create({
  iconSmall: {
    width: 30,
    height: 30,
  },
  list: {
    marginTop: "25%",
    paddingStart: "5%",
    padding: "5%",
  },
  tempsDay: {
    flexDirection: "row",
    marginTop: "2%",
  },
  listText: {
    marginTop: "4%",
    fontSize: 45,
    marginLeft: "2%",
    fontWeight: "100",
    color: "black",
  },
  listTextSmall: {
    marginLeft: "20%",
    marginBottom: "10%",
    fontSize: 16,
    fontWeight: "300",
    color: "black",
  },
  subDescription: {
    fontSize: 16,
    fontWeight: "300",
    color: "black",
    marginStart: "2%",
    marginEnd: "2%",
    marginBottom: "2%",
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: "#28282B",
  },
  description: {
    flex: 3,
  },
  descriptionSmall: {
    marginTop: "3%",
    marginBottom: "3%",
    marginLeft: "2%",
    fontSize: 22,
    fontWeight: "300",
    textTransform: "capitalize",
    color: "black",
  },
  image: {
    width: "30%",
  },

  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: "3%",

    padding: "4%",
    borderRadius: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  smallCardHead: {
    flexDirection: "row",
    marginBottom: "2%",
    marginLeft: "2%",
  },
});

export default CustomCard;
