import addDivToBody from "./dom";
import $ from "jquery";

test("dom test", () => {
  addDivToBody();
  addDivToBody();
  expect($("body").find("div").length).toBe(2);
});
