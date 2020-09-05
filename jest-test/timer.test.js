import timer from "./timer";
beforeEach(() => {
  jest.useFakeTimers();
});
test("timer 测试 1", () => {
  const fn = jest.fn();
  timer(fn);
  // jest.runAllTimers();
  // jest.runOnlyPendingTimers();
  jest.advanceTimersByTime(3000);
  expect(fn).toHaveBeenCalledTimes(1);
});

test("timer 测试 2", () => {
  const fn = jest.fn();
  timer(fn);
  // jest.runAllTimers();
  // jest.runOnlyPendingTimers();
  jest.advanceTimersByTime(3000);
  expect(fn).toHaveBeenCalledTimes(1);
});
