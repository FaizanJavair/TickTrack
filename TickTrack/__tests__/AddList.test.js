import React from "react";
import renderer from "react-test-renderer";
import ListModal from "../modals/listModal";

it("List Modal renders correctly", () => {
  const tree = renderer.create(<ListModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
