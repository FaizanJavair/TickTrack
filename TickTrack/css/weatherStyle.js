import { StyleSheet } from "react-native";

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

export { styles };
