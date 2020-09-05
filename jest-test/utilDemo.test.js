jest.mock("./util");
import Uitl from "./util";
import demoFn from "./utilDemo";
import Util from "./util";

test("测试 utilDemo", () => {
  demoFn();
  expect(Uitl).toHaveBeenCalled();
  expect(Util.mock.instances[0].a).toHaveBeenCalled();
  expect(Util.mock.instances[0].b).toHaveBeenCalled();
});
