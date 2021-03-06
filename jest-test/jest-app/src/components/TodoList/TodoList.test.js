import React from "react";
import TodoList from "./TodoList";
import { shallow } from "enzyme";

test("TodoList 组件初始化渲染应该为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.find("li").length).toBe(0);
});

test("TodoList 组件初始化渲染应该为空", () => {
  const wrapper = shallow(<TodoList />);
  expect(wrapper.find("li").length).toBe(0);
});

test("TodoList 组件初始化 输入回车后有新的渲染数据", () => {
  const wrapper = shallow(<TodoList />);
  wrapper.find("Header").props().addUndoItem("jgchen1");
  wrapper.find("Header").props().addUndoItem("jgchen2");
  wrapper.find("Header").props().addUndoItem("jgchen3");
  expect(wrapper.find("li").length).toBe(3);
});
