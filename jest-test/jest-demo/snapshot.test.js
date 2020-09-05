import { generalConfig, generalAnotherConfig } from "./snapshot";

test("测试generateConfig", () => {
  expect(generalConfig()).toMatchSnapshot({
    num: expect.any(Number),
  });
});

// test("测试generateAnotherConfig", () => {
//   expect(generalAnotherConfig()).toMatchSnapshot({
//     time: expect.any(Date),
//   });
// });

test("测试generateAnotherConfig with inline", () => {
  expect(generalAnotherConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date),
    },
    `
    Object {
      "port": 8081,
      "server": "localhost",
      "time": Any<Date>,
    }
  `
  );
});
