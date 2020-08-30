import axios from "axios";
export function runCallback(callback) {
  callback("abc");
}

export function createObject(ClassItem) {
  return new ClassItem();
}

export function getData() {
  return axios.get("/api").then((res) => res.data);
}
