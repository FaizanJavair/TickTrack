import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listContainer: {
    width: 350,
    borderRadius: 15,
    paddingTop: "8%",
    paddingHorizontal: "8%",
    marginVertical: "2.5%",
    height: 300,
  },
  listTitle: {
    fontSize: 22,
    width: 200,
    fontWeight: "bold",
    marginBottom: "2.1%",
    color: "white",
  },
  count: {
    fontSize: 22,
    color: "white",
    fontWeight: "200",
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listsubTitle: {
    flexDirection: "row",
    marginLeft: "4%",
  },

  remainText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    borderBottomColor: "white",
    marginTop: "2%",
    marginBottom: "2%",
  },
  remainView: {
    borderBottomWidth: 1,
    marginTop: "2%",
    marginBottom: "3%",
    borderColor: "white",
    width: 180,
  },
  tasks: {
    flexDirection: "row",
    paddingVertical: "2%",
    alignItems: "center",
  },
  taskText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: "1%",
    marginLeft: "3%",
    marginTop: "1%",
  },
  muted: {
    color: "white",
    fontWeight: "500",
    fontSize: 13,
    marginTop: "1%",
  },
  taskRow: {
    flexDirection: "row",
    width: "92%",
    padding: 1,
    justifyContent: "space-between",
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
    fontSize: 10,
    color: "white",
    fontWeight: "800",
  },
});
export { styles };
