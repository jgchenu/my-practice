const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();
channel.on('error', function(err) {
  console.log(err.message);
});
channel.emit('error', new Error('my error'));
/**
 * 如果这个error事件类型被发出时没有该事件类型的监听器，事件发射器会输出一个堆栈跟踪(到错误发生时所执行过的程序指令列表)并停止执行。Unhandled "error" event
 * 堆栈跟踪会用emit调用的第二个参数指明错误类型。
 * 这是只有错误类型事件才能享受的特殊待遇，在发出没有监听器的其他事件类型时，什么也不会发生。
 * 如果发出的error类型事件没有作为第二个参数的error对象，堆栈跟踪会指出一个“未 捕获、未指明的‘错误’事件”错误，并且程序会停止执行。
 * 你可以用一个已经被废除的方法处理这个错误，用下面的代码定义一个全局处理器实现响应逻辑:
 */
process.on('uncaughtException', function(err) {
  console.error(err.stack);
  process.exit(1);
});
