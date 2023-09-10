import React from "react";
import renderer from "react-test-renderer";

import CustomCard from "../components/customCard";

it("Custom Card renders correctly", () => {
  const tree = renderer
    .create(
      <CustomCard
        temperature={"67"}
        description={"Something"}
        tempUnit={"°"}
        desc1={"79"}
        unit1={"%"}
        desc2={"42"}
        unit2={"%"}
        desc3={"2"}
        unit3={"m/s"}
        desc4={"8"}
        unit4={"hPa"}
        mainImg={`http://openweathermap.org/img/wn/01n@4x.png`}
        dt={"1221212"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
