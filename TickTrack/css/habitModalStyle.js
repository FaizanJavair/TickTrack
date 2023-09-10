import { StyleSheet } from "react-native";

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
export { styles };
