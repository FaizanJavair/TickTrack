import React from "react";
import renderer from "react-test-renderer";

import AddTask from "../modals/addTaskModal";
import dataTemp from "../data";

it("Add Task renders correctly", () => {
  const tree = renderer.create(<AddTask list={dataTemp} />).toJSON();
  expect(tree).toMatchSnapshot();
});
