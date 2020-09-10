import React, { useState, useRef } from "react";
import Header from "./../Header";

export default function TodoList() {
  const idRef = useRef(0);
  const [list, setList] = useState([]);
  return (
    <div>
      <Header
        addUndoItem={(v) => {
          setList([...list, { id: idRef.current++, val: v }]);
        }}
      />
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.val}</li>
        ))}
      </ul>
    </div>
  );
}
