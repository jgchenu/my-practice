import React from "react";
import ReactDOM from "react-dom";
// 匿名闭包，其实是看不见的，这里用数组模拟实际上的单链表，hookIndex++代表实际上的链表的next
let hookIndex = 0;
const hookStates = [];

function useState(initState) {
  const currentIndex = hookIndex;
  hookStates[currentIndex] =
    hookStates[currentIndex] || typeof initState === "function"
      ? initState()
      : initState;
  function setState(val) {
    hookStates[currentIndex] = val;
    render();
  }
  return [hookStates[hookIndex++], setState];
}

function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) {
    const [lastCallback, lastDependencies] = hookStates[hookIndex];
    const same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
      return lastCallback;
    } else {
      hookStates[hookIndex++] = [callback, dependencies];
      return callback;
    }
  } else {
    hookStates[hookIndex++] = [callback, dependencies];
    return callback;
  }
}

function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) {
    const [lastMemo, lastDependencies] = hookStates[hookIndex];
    const same = dependencies.every(
      (item, index) => item === lastDependencies[index]
    );
    if (same) {
      hookIndex++;
      return lastMemo;
    } else {
      const newMemo = factory();
      hookStates[hookIndex++] = [newMemo, dependencies];
      return newMemo;
    }
  } else {
    const newMemo = factory();
    hookStates[hookIndex++] = [newMemo, dependencies];
    return newMemo;
  }
}

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

function memo(OldFuncionComp) {
  return class NewFuncionComp extends React.PureComponent {
    render() {
      return <OldFuncionComp {...this.props} />;
    }
  };
}

function useContext(context) {
  return context._currentValue;
}

const AppContext = React.createContext({});
const Son = () => {
  console.log("render son");
  const [num, setNum] = useContext(AppContext);
  return (
    <div style={{ color: "red" }} onClick={() => setNum(num + 1)}>
      {num}
    </div>
  );
};

const Child = memo((props) => {
  console.log("render Child");
  return (
    <>
      <button onClick={props.onClick}>{props.data.num}</button>
      <Son />
    </>
  );
});

function App() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");

  const onClick = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  const data = useMemo(() => ({ num }), [num]);

  useEffect(() => {
    document.title = num;
    return () => {
      console.log("cancel callback", num);
    };
  }, [num]);

  useLayoutEffect(() => {
    const text = document.createTextNode(num);
    document.body.appendChild(text);
    return () => {
      document.body.removeChild(text);
    };
  }, [num]);

  const values = useMemo(() => [num, setNum], [num]);

  return (
    <AppContext.Provider value={values}>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Child onClick={onClick} data={data} />
      </div>
    </AppContext.Provider>
  );
}

function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
