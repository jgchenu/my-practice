// RxJS v6+
import { interval, of, asyncScheduler } from "rxjs";
import { throttleTime } from "rxjs/operators";

// 每1秒发出值
const source = of(1, 2, 3, 4, 5, 6, 7);
/*
  节流5秒
  节流结束前发出的最后一个值将从源 observable 中发出
*/
const example = source.pipe(throttleTime(5000, asyncScheduler));
// 输出: 0...6...12
const subscribe = example.subscribe((val) => console.log(val));
