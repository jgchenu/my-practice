import React, { useState } from "react";
function Header(props) {
  const [value, setValue] = useState("");
  return (
    <header>
      <input
        type="text"
        data-test="input"
        value={value}
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
