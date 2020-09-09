import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";

test("Header 组件应该渲染一个input", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('[data-test="input"]')).toExist();
});

test("Header 渲染的input初始值是空", () => {
  const wrapper = shallow(<Header />);
  const inputElem = wrapper.find('[data-test="input"]');
  expect(inputElem.prop("value")).toBe("");
});

test("Header 渲染的input change 事件会改变值", () => {
  const wrapper = shallow(<Header />);
  const userValue = "jgchen";
  const inputElem = wrapper.find('[data-test="input"]');
  inputElem.simulate("change", {
    target: { value: userValue },
  });
  expect(wrapper.find('[data-test="input"]').props().value).toBe(userValue);
});

test("Header 渲染的input 按下回车 没内容 回调事件不会被调用", () => {
  const wrapper = shallow(<Header />);
  const fn = jest.fn();
  const inputElem = wrapper.find('[data-test="input"]');
  inputElem.simulate("keyUp", {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalled();
});

test("Header 渲染的input 按下回车 有内容 回调事件会被调用", () => {
  const wrapper = shallow(<Header />);
  const fn = jest.fn();
  const inputElem = wrapper.find('[data-test="input"]');
  inputElem.simulate("change", {
    target: { value: "jgchen" },
  });
  inputElem.simulate("keyDown", {
    keyCode: 13,
  });
  expect(fn).not.toHaveBeenCalledWith("jgchen");
});
