import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

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
          <Text style={styles.subDescription}>
            {props.desc1}
            {props.unit1}
          </Text>

          <Text style={styles.subDescription}>
            {props.desc2}
            {props.unit2}
          </Text>
        </View>
        <View style={styles.tempsDay}>
          <Text style={styles.subDescription}>
            {props.desc3}
            {props.unit3}
          </Text>

          <Text style={styles.subDescription}>
            {props.desc4}
            {props.unit4}
          </Text>
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
    marginTop: "1%",
  },
  listText: {
    marginTop: "4%",
    fontSize: 35,
    color: "black",
  },
  listTextSmall: {
    marginLeft: "30%",
    marginBottom: "10%",
    fontSize: 20,
    color: "black",
  },
  subDescription: {
    fontSize: 20,
    color: "black",
    marginStart: "2%",
    marginEnd: "2%",
    marginTop: "2%",
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    flex: 3,
  },
  descriptionSmall: {
    marginTop: "3%",
    marginBottom: "3%",
    fontSize: 25,
    color: "black",
  },
  image: {
    flex: 1,
    marginEnd: "2%",
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
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
  },
});

export default CustomCard;
