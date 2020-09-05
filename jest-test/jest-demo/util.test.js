import Util from "./util";

let util = null;
beforeEach(() => {
  util = new Util();
});

test("Util", () => {
  expect(util.a()).toBe("a");
  expect(util.b()).toBe("b");
});
