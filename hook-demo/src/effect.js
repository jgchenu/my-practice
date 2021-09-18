import React, { useRef } from "react";
import ReactDOM from "react-dom";

// 匿名闭包，其实是看不见的，这里用数组模拟实际上的单链表，hookIndex++代表实际上的链表的next
let hookIndex = 0;
const hookStates = [];

function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    const [lastCancel, lastDependencies] = hookStates[hookIndex];
    const same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
    } else {
      typeof lastCancel === "function" && lastCancel();
      const currentIndex = hookIndex;
      hookStates[hookIndex++] = [, dependencies];
      setTimeout(() => {
        hookStates[currentIndex][0] = callback();
      });
    }
  } else {
    const currentIndex = hookIndex;
    hookStates[hookIndex++] = [, dependencies];
    setTimeout(() => {
      hookStates[currentIndex][0] = callback();
    });
  }
}

function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    const [lastCancel, lastDependencies] = hookStates[hookIndex];
    const same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
    } else {
      typeof lastCancel === "function" && lastCancel();
      const currentIndex = hookIndex;
      hookStates[hookIndex++] = [, dependencies];
      Promise.resolve().then(() => {
        hookStates[currentIndex][0] = callback();
      });
    }
  } else {
    const currentIndex = hookIndex;
    hookStates[hookIndex++] = [, dependencies];
    Promise.resolve().then(() => {
      hookStates[currentIndex][0] = callback();
    });
  }
}

function App() {
  const effectRef = useRef(null);
  const layoutEffectRef = useRef(null);

  useEffect(() => {
    effectRef.current.style.transform = "translateX(300px)";
    effectRef.current.style.transition = "all 300ms";
  }, []);

  useLayoutEffect(() => {
    layoutEffectRef.current.style.transform = "translateX(300px)";
    layoutEffectRef.current.style.transition = "all 300ms";
  }, []);

  return (
    <div>
      <div
        ref={effectRef}
        style={{ height: 100, width: 100, backgroundColor: "red" }}
      ></div>
      <div
        ref={layoutEffectRef}
        style={{ height: 100, width: 100, backgroundColor: "red" }}
      ></div>
    </div>
  );
}

function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
