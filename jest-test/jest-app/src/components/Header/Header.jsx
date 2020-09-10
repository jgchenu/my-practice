import React, { useState } from "react";
import "./style.css";
function Header(props) {
  const [value, setValue] = useState("");
  return (
    <header className="header-wrap">
      <input
        type="text"
        data-test="input"
        value={value}
        placeholder="输入回车"
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => {
          if (value && e.keyCode === 13) {
            props.addUndoItem(value);
          }
        }}
      />
    </header>
  );
}

export default Header;
