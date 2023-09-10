import React from "react";
import renderer from "react-test-renderer";
import EditHabitModal from "../modals/editHabitModal";

habit = {
  id: 1,
  name: "Drinking Water",
  color: "#414a4c",
  priority: "High",
  priorityValue: "2",
};

it("List Modal renders correctly", () => {
  const tree = renderer.create(<EditHabitModal habit={habit} />).toJSON();
  expect(tree).toMatchSnapshot();
});
