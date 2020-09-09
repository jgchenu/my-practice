import React, { useState } from "react";
import Header from "./../Header";

export default function TodoList() {
  const [list, setList] = useState([]);
  return (
    <div>
      <Header
        addUndoItem={(v) => {
          setList((pre) => [...pre, v]);
        }}
      />
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
