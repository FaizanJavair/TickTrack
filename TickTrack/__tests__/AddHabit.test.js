import React from "react";
import renderer from "react-test-renderer";

import AddHabitModal from "../modals/addHabitModal";

it("Add Habit Modal renders correctly", () => {
  const tree = renderer.create(<AddHabitModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
