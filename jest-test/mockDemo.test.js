jest.mock("./mockDemo");
import { getData } from "./mockDemo";

const { getNumber } = jest.requireActual("./mockDemo");

test("test getData", () => {
  return getData().then((res) => {
    expect(res).toEqual({
      data: 123,
    });
  });
});

test("test getNumber", () => {
  return expect(getNumber()).toBe(123);
});
