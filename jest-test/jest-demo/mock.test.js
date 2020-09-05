import { runCallback, createObject, getData } from "./mock";
import axios from "axios";
jest.mock("axios");
test("test runCallback", () => {
  const fn = jest.fn();
  // fn.mockReturnValueOnce(123);
  // fn.mockReturnValue(123);
  runCallback(fn);
  runCallback(fn);
  runCallback(fn);
  // console.log(fn.mock);
  expect(fn.mock.calls.length).toBe(3);
});

test("test createObject", () => {
  const fn = jest.fn();
  // fn.mockReturnValueOnce(123);
  // fn.mockReturnValue(123);
  // fn.mockImplementation(() => 123);
  // fn.mockReturnThis();
  createObject(fn);
  // console.log(fn.mock);
  // console.log(fn.mock.instances);
  // expect(fn.mock.calls.length).toBe(3);
});

test("test getData", async () => {
  axios.get.mockResolvedValue({ data: "hello" });
  // axios.get.mockResolvedValueOnce({ data: "hello" });
  await getData().then((res) => {
    expect(res).toBe("hello");
  });
});
