import React, { memo } from "react";

const Son = memo(function _Son() {
  console.log("son rerender");
  return <div>son</div>;
});

export default Son;
