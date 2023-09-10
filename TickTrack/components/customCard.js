import React from "react";
import { View, Image, Text } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "../css/customCardStyle";

// Custom card used in the Daily and Hourly screen
const CustomCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.description}>
        <Text style={styles.listText}>{props.temperature}°</Text>

        <Text style={styles.descriptionSmall}>{props.description}</Text>
        <View style={styles.tempsDay}>
          <View style={styles.smallCardHead}>
            <Ionicons
              name={"water-outline"}
              size={16}
              color={"#36454F"}
              style={{ marginTop: 2, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>{props.desc1}%</Text>
          </View>
          <View style={styles.smallCardHead}>
            <Feather
              name={"cloud"}
              size={16}
              color={"#36454F"}
              style={{ marginTop: 2, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>{props.desc2}%</Text>
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
            <Text style={styles.subDescription}>{props.desc3} km/h</Text>
          </View>
          <View style={styles.smallCardHead}>
            <Octicons
              name={"meter"}
              size={14}
              color={"#36454F"}
              style={{ marginTop: 4, marginEnd: 3 }}
            />
            <Text style={styles.subDescription}>{props.desc4} hPa</Text>
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

export default CustomCard;
