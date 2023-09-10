import { StyleSheet } from "react-native";

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
    marginLeft: "22%",
    marginBottom: "10%",
    fontSize: 14,
    fontWeight: "400",
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
export { styles };
