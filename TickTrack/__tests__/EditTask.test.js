import React from "react";
import renderer from "react-test-renderer";
import EditTaskModal from "../modals/editTaskModal";

list = {
  id: 1,
  name: "Drinking Water",
  color: "#414a4c",
  priority: "High",
  priorityValue: "2",
};
task = {
  id: "1",
  completed: "false",
  dueDateTime: { nano: "0", seconds: "1694214094" },
  title: "Drinking Water",
  color: "#414a4c",
  text: "06/09/2023 | 1:53 pm",
};

it("Edit Task Modal renders correctly", () => {
  const tree = renderer
    .create(<EditTaskModal task={task} list={list} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
