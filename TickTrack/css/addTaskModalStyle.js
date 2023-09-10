import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingVertical: "5%",
    alignItems: "center",
  },
  add: {
    borderRadius: 12,
    padding: 12,
    width: "50%",
  },
  input: {
    height: 40,
    width: 330,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  homeTask: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  closeButton: {
    position: "absolute",
    top: "7%",
    left: "7%",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    marginBottom: "5%",
  },
  button: {
    fontSize: 15,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 10,
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  date: {
    marginTop: "2%",
    marginLeft: "2%",
    fontSize: 18,
  },
});
export { styles };
