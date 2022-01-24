import React, { lazy, useState, Suspense, useEffect } from "react";
import ReactDOM from "react-dom";

function lazyWithReload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}

const Son = lazyWithReload(() => import("./son.js"));

function Test() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    Son.preload();
  }, []);

  return (
    <div>
      <button onClick={() => setNum((prev) => prev + 1)}>{num}</button>
      <Suspense fallback={null}>{num === 1 && <Son />}</Suspense>
    </div>
  );
}

ReactDOM.render(<Test />, document.getElementById("root"));
