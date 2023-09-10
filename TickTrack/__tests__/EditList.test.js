import React from "react";
import renderer from "react-test-renderer";
import EditListModal from "../modals/editListModal";

list = {
  id: 1,
  name: "Drinking Water",
  color: "#414a4c",
  priority: "High",
  priorityValue: "2",
};

it("Edit List Modal renders correctly", () => {
  const tree = renderer.create(<EditListModal list={list} />).toJSON();
  expect(tree).toMatchSnapshot();
});
