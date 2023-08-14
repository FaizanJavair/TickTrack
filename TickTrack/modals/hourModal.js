import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomCard from "../components/customCard";

export default function HourModal(props) {
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Async Function to check errors
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission Denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});

      //Getting hourly data from API
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&exclude=minutely,daily&units=metric&appid=1f7892e7d880136fee0501f0feb76a6f`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setlocation(json);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  if (errorMsg !== null) {
    //error occured
    return (
      <View style={styles.container}>
        <Text>Error here</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (location !== null) {
    var cZone = moment.tz.zonesForCountry(props.location.country, true);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.listTitle}>Hourly Data</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.closeModal}
          >
            <Ionicons name="close-outline" size={30} />
          </TouchableOpacity>
        </View>

        {/* Using flat list to show data */}
        {/* By parsing over the list the API provides and displaying it */}
        <View style={{ height: "92%", backgroundColor: "#00000000" }}>
          <FlatList
            contentContainerStyle={{
              paddingVertical: "2%",
            }}
            style={styles.list}
            vertical
            data={location.hourly.splice(0, 24)}
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
        </View>
      </SafeAreaView>
    );
  } else {
    //waiting
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.listTitle}>Hourly Data</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.closeModal}
          >
            <Ionicons name="close-outline" size={30} />
          </TouchableOpacity>
        </View>
        <ActivityIndicator style={{ marginTop: "80%" }} color={"black"} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
  },
  list: {
    paddingStart: "5%",
    padding: "5%",
  },
  closeButton: {
    position: "absolute",
    left: "93%",
    top: "33%",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderBottomWidth: 10,
  },
  listTitle: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "2%",
    borderBottomWidth: 1,
  },
});
