import axios from "axios";
export function fetchData(fn) {
  return axios.get("http://www.dell-lee.com/react/api/demo.json");
}

export function fetchData404() {
  return axios.get("http://www.dell-lee.com/react/api/demo1.json");
}
