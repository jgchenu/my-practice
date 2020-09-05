import Counter from "./Counter";

describe("测试Counter的代码", () => {
  let counter = null;

  beforeAll(() => {
    // console.log("before all");
  });

  afterAll(() => {
    // console.log("after all");
  });

  beforeEach(() => {
    // console.log("before each");
    counter = new Counter();
  });

  afterEach(() => {
    // console.log("after each");
  });

  describe("测试Counter的add代码", () => {
    test("测试Counter 的add One 方法", () => {
      // console.log("test addOne");
      counter.addOne();
      expect(counter.num).toBe(1);
    });
  });

  describe("测试Counter的minus代码", () => {
    test("测试Counter minus One 方法", () => {
      // console.log("test minusOne");
      counter.minusOne();
      expect(counter.num).toBe(-1);
    });
  });
});
