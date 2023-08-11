import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import moment from "moment-timezone";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomCard from "../components/customCard";

export default function HourModal(props) {
  var cZone = moment.tz.zonesForCountry(props.location.country, true);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={props.closeModal}>
        <Ionicons name="close-outline" size={30} />
      </TouchableOpacity>
      {/* Using flat list to show data */}
      {/* By parsing over the list the API provides and displaying it */}
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        vertical
        data={props.forecast.hourly.splice(0, 24)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(hour) => {
          const weather = hour.item.weather[0];
          var dt = moment
            .tz(hour.item.dt * 1000, cZone[0].name)
            .format("h:mm a");
          return (
            // Calling the custom card function and sending in the appropriate props we want to show
            <CustomCard
              temperature={Math.round(hour.item.temp)}
              description={weather.description}
              tempUnit={"°"}
              desc1={hour.item.humidity}
              unit1={"%"}
              desc2={hour.item.clouds}
              unit2={"%"}
              desc3={hour.item.wind_speed}
              unit3={"m/s"}
              desc4={hour.item.pressure}
              unit4={"hPa"}
              mainImg={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              dt={dt}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  list: {
    paddingStart: "5%",
    padding: "5%",
  },
  closeModal: {
    position: "absolute",
    top: "20%",
    left: "20%",
  },
});
