const bucket = new WeakMap();

function track(target, key) {
  if (!activeEffect) {
    return;
  }
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);
  if (!effects) {
    return;
  }
  const effectsToRun = new Set();
  effects.forEach((effect) => {
    if (activeEffect !== effect) {
      effectsToRun.add(effect);
    }
  });
  effectsToRun.forEach((fn) => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn);
    } else {
      fn();
    }
  });
}

function cleanup(effectFn) {
  const deps = effectFn.deps;
  for (let index = 0; index < deps.length; index++) {
    const dep = deps[index];
    dep.delete(effectFn);
  }
  deps.length = 0;
}

let activeEffect;
const effectStack = [];
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn.options = options;
  effectFn();
}

const data = {
  text: "text",
  text2: "text2",
  ok: true,
  num: 1,
};
const obj = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    trigger(target, key);
    return true;
  },
});

//  每次副作用执行更新依赖
// effect(() => {
//   document.querySelector("#one").innerHTML = obj.ok ? obj.text : "default text";
//   console.log("trigger effect1");
// });
// obj.ok = false;
// obj.text = "new text"; // 不会触发

// 嵌套副作用问题
// effect(() => {
//   console.log("trigger effect1");
//   effect(() => {
//     console.log("trigger effect2");
//     document.querySelector("#two").innerHTML = obj.text2;
//   });
//   document.querySelector("#one").innerHTML = obj.text;
// });
// obj.text = "new";

// 无限递归副作用问题
// effect(() => {
//   document.querySelector("#one").innerHTML = obj.text += 1;
// });

// 异步调度器
// effect(
//   () => {
//     document.querySelector("#one").innerHTML = obj.num;
//     console.log("effect", obj.num);
//   },
//   {
//     scheduler: (fn) => {
//       setTimeout(() => {
//         fn();
//       }, 0);
//     },
//   }
// );
// obj.num++;
// console.log("结束了");
