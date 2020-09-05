import axios from "axios";
export function getData() {
  return axios.get("http://127.0.0.1:8080").then((res) => res.data);
}

export function getNumber() {
  return 123;
}
