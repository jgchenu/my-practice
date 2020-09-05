import React from "react";
import { shallow } from "enzyme";
import App from "./App";

// test("renders learn react link", () => {
//   const result = render(<App />);
//   const linkElement = result.getByText(/hello world/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("render without crashing", () => {
  const wrapper = shallow(<App />);
  console.log(wrapper.find(".App"));
});
