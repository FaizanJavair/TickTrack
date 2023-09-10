import React from "react";
import renderer from "react-test-renderer";

import HabitList from "../screens/habitList";
habit = {
  id: 1,
  name: "Drinking Water",
  color: "#414a4c",
  priority: "High",
  priorityValue: "2",
  startDate: { nano: "0", seconds: "1694214094" },
  history: [],
};
it("Habit List renders correctly", () => {
  const tree = renderer.create(<HabitList habit={habit} />).toJSON();
  expect(tree).toMatchSnapshot();
});
