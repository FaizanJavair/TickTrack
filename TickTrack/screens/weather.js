import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { auth } from "../database/firebase";
import * as Location from "expo-location";
import moment from "moment-timezone";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HourModal from "../modals/hourModal";
import DailyModal from "../modals/dailyModal";

const Weather = ({ navigation }) => {
  const [location, setlocation] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hourModal, setHourModal] = useState(false);
  const [dailyModal, setDailyModal] = useState(false);
  const [action, setAction] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    // Async Function to check errors
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission Denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      // Fetching the current data
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=ac85f77e4d3c9527115d512f8f24d3f7&units=metric`,
        {
          method: "POST",
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
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&exclude=minutely&units=metric&appid=1f7892e7d880136fee0501f0feb76a6f`,
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
          setForecast(json);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  console.log(forecast);

  if (errorMsg !== null) {
    //error occured
    return (
      <View style={styles.container}>
        <Text>Error here</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else if (location !== null && forecast !== null) {
    let temp = Math.round(location.main.temp);
    var cZone = moment.tz.zonesForCountry(location.sys.country, true);

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          visible={modal}
          style={{ backgroundColor: "gray" }}
          onRequestClose={() => setModal(!modal)}
        >
          {action === "Hourly" ? (
            <HourModal
              forecast={forecast}
              closeModal={() => setModal(!modal)}
              timezone={cZone[0].name}
              location={location.sys}
            />
          ) : action === "Daily" ? (
            <DailyModal
              forecast={forecast}
              closeModal={() => setModal(!modal)}
              timezone={cZone[0].name}
              location={location.sys}
            />
          ) : null}
        </Modal>

        <View style={styles.bigCard}>
          <View style={styles.countrySection}>
            <Text style={styles.countryText}>
              {location.name}, {location.sys.country}
            </Text>
          </View>
          <View style={styles.tempSection}>
            <Text style={styles.tempText}>{temp}°</Text>
            <View style={styles.imageSection}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${location.weather[0].icon}@4x.png`,
                }}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionText}>
              {location.weather[0].description}
            </Text>
          </View>
          {/* Min Max Section */}
          <View style={styles.minMaxSection}>
            <View style={styles.minSubSection}>
              <FontAwesome
                name={"thermometer-full"}
                size={18}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.minMaxText}>
                {Math.round(location.main.temp_max)}° Hi
              </Text>
            </View>
            <View style={styles.minSubSection}>
              <FontAwesome
                name={"thermometer-1"}
                size={18}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.minMaxText}>
                {Math.round(location.main.temp_min)}° Lo
              </Text>
            </View>
          </View>
          {/* Pressure Section */}
          <View style={styles.footSection}>
            <View style={styles.footSubSection}>
              <Octicons
                name={"meter"}
                size={18}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.minMaxText}>
                {location.main.pressure} hPa
              </Text>
            </View>
            <View style={styles.footSubSection}>
              <Ionicons
                name={"water-outline"}
                size={18}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.minMaxText}>
                {Math.round(location.main.humidity)}%
              </Text>
            </View>
            <View style={styles.footSubSection}>
              <MaterialCommunityIcons
                name={"weather-windy"}
                size={18}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.minMaxText}>{location.wind.speed} km/h</Text>
            </View>
          </View>
        </View>
        {/* Small cards */}
        <View style={styles.smallCardSection}>
          <View style={styles.smallCard}>
            <View style={styles.smallCardHead}>
              <FontAwesome
                name={"thermometer-3"}
                size={16}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.smallCardHeadText}>Feels Like</Text>
            </View>
            <View>
              <Text style={styles.smallCardMainText}>
                {Math.round(location.main.feels_like)}°
              </Text>
              <Text style={styles.descriptionText}>
                {location.weather[0].main}
              </Text>
            </View>
          </View>
          <View style={styles.smallCard}>
            <View style={styles.smallCardHead}>
              <FontAwesome
                name={"thermometer-3"}
                size={16}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.smallCardHeadText}>Sunrise & Set</Text>
            </View>
            <View style={styles.smallCardHead}>
              <Feather
                name={"sunrise"}
                size={22}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.sunText}>
                {moment
                  .tz(location.sys.sunrise * 1000, cZone[0].name)
                  .format("h:mm a")}
              </Text>
            </View>
            <View style={styles.smallCardHead}>
              <Feather
                name={"sunset"}
                size={22}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.sunText}>
                {moment
                  .tz(location.sys.sunset * 1000, cZone[0].name)
                  .format("h:mm a")}
              </Text>
            </View>
          </View>
        </View>
        {/* Small cards */}

        <View style={styles.smallCardSection}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => {
              setModal(true);
              setAction("Hourly");
            }}
          >
            <View style={styles.smallCardHead}>
              <FontAwesome
                name={"hourglass-end"}
                size={16}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.smallCardHeadText}>Hourly Forecast</Text>
            </View>
            <Text style={styles.sunText}>Next Hour</Text>
            <View style={styles.forecastSection}>
              <Text style={styles.sunText}>
                {Math.round(forecast.hourly[1].temp)}°
              </Text>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.hourly[1].weather[0].icon}@4x.png`,
                }}
                style={styles.smallIcon}
              />
            </View>
            <Text style={styles.forecastDesc}>
              {forecast.hourly[1].weather[0].description}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => {
              setModal(true);
              setAction("Daily");
            }}
          >
            <View style={styles.smallCardHead}>
              <FontAwesome
                name={"calendar"}
                size={16}
                color={"#36454F"}
                style={{ marginTop: 2, marginEnd: 3 }}
              />
              <Text style={styles.smallCardHeadText}>Daily Forecast</Text>
            </View>
            <View>
              <Text style={styles.sunText}>Tomorrow</Text>
              <View style={styles.forecastSection}>
                <Text style={styles.sunText}>
                  {Math.round(forecast.daily[1].temp.max)}°
                </Text>
                <Image
                  source={{
                    uri: `http://openweathermap.org/img/wn/${forecast.daily[1].weather[0].icon}@4x.png`,
                  }}
                  style={styles.smallIcon}
                />
              </View>
              <Text style={styles.forecastDesc}>
                {forecast.daily[1].weather[0].description}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    //waiting
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{ marginTop: "80%" }} color={"black"} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logButton: {
    backgroundColor: "black",
    width: "60%",
    marginHorizontal: "20%",
    borderRadius: 15,
    marginVertical: 5,
    height: 40,
  },
  logText: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: "150%",
    height: "150%",
    padding: "8%",
    tintColor: "#28282B",
  },
  bigCard: {
    flexDirection: "column",
    width: "95%",
    marginTop: "3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: "10%",
    paddingTop: "5%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  countryText: {
    fontWeight: 400,
    fontSize: 32,
  },
  tempText: {
    fontSize: 52,
    fontWeight: 100,
  },
  descriptionText: {
    fontSize: 22,
    fontWeight: 300,
    textTransform: "capitalize",
  },
  descriptionSection: {
    marginTop: "6%",
  },
  tempSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  countrySection: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  imageSection: {
    marginTop: "5%",
  },
  minMaxSection: {
    flexDirection: "row",
    marginTop: "5%",
    marginBottom: "2%",
  },
  minSubSection: {
    flexDirection: "row",
    marginHorizontal: "10%",
  },
  footSection: {
    flexDirection: "row",
    marginVertical: "10%",
  },
  footSubSection: {
    flexDirection: "row",
    marginHorizontal: "8%",
  },
  minMaxText: {
    fontSize: 18,
    fontWeight: 300,
  },
  smallCardSection: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  smallCard: {
    height: 170,
    width: "48%",
    borderRadius: 12,
    padding: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "white",
  },
  smallCardHead: {
    flexDirection: "row",
    marginBottom: "12%",
  },
  smallCardHeadText: {
    fontSize: 16,
    marginStart: 3,
    fontWeight: 400,
  },
  smallCardMainText: {
    fontSize: 52,
    fontWeight: 200,
  },
  sunText: {
    fontSize: 22,
    marginStart: 3,
    fontWeight: 300,
  },
  smallIcon: {
    width: "30%",
    height: "30%",
    padding: "8%",
    tintColor: "#28282B",
  },
  forecastSection: {
    margin: 1,
    flexDirection: "row",
  },

  forecastDesc: {
    fontSize: 16,
    marginLeft: 4,
    fontWeight: 200,
    textTransform: "capitalize",
  },
});

export default Weather;
