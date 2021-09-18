import React, { useRef } from "react";
import ReactDOM from "react-dom";
// 匿名闭包，其实是看不见的，这里用数组模拟实际上的单链表，hookIndex++代表实际上的链表的next
let hookIndex = 0;
const hookStates = [];

function numberReducer(state, action) {
  switch (action) {
    case "add":
      return state + 1;
    case "decrease":
      return state - 1;
    default:
      return state;
  }
}

function useReducer(reducer, initState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initState;
  const currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer
      ? reducer(hookStates[currentIndex], action)
      : action;
    render();
  }
  return [hookStates[hookIndex++], dispatch];
}

function useState(initState) {
  return useReducer(null, initState);
}

function App() {
  const [name, setName] = useState("");
  const [num, dispatch] = useReducer(numberReducer, 0);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch("add");
        }}
      >
        {num}
      </button>
    </div>
  );
}

function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
