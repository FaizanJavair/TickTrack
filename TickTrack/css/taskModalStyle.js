import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    marginLeft: "5%",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
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
  title: {
    fontWeight: "600",
    fontSize: 25,
    width: 300,
  },
  subTitle: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  tasks: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "5%",
    marginBottom: "3%",
  },
  tasksRemain: {
    alignItems: "center",
    marginBottom: "3%",
  },
  taskText: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: "3%",
    marginTop: "1%",
  },
  listTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: "2%",
    marginTop: "3%",
    marginLeft: "5%",
    borderBottomWidth: 1,
  },
  footer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    borderRadius: 12,
    padding: 12,
    width: "80%",
    height: "5%",
  },
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    position: "absolute",
    top: "95%",
    right: 20,
    height: 65,
    borderRadius: 100,
  },

  taskRow: {
    flexDirection: "row",
    width: "92%",
    padding: 1,
    justifyContent: "space-between",
  },
  subSection: {
    flexDirection: "row",
  },
  tags: {
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    marginTop: "1%",
    borderRadius: 8,
    marginEnd: "2%",
  },
  taskExtra: {
    flexDirection: "column",
    marginLeft: "11%",
  },
  taskCard: {
    backgroundColor: "white",
    paddingVertical: "3%",
    width: 350,
    paddingHorizontal: "3%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  editTag: {
    paddingHorizontal: "3%",
    paddingVertical: "2%",
    marginTop: "2%",
    borderRadius: 12,
    width: 140,
    marginEnd: "2%",
  },
  due: {
    fontSize: 15,
    justifyContent: "center",
    fontWeight: 300,
    marginLeft: "4%",
    color: "white",
  },
  dueDate: {
    fontSize: 14,
    fontWeight: 300,
  },
});

export { styles };
