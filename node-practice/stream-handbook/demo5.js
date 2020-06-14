var Readable = require('stream').Readable;
var rs = Readable();

var c = 97 - 1;

/**
 * _read函数也可以获取一个size参数来指明消耗者想要读取多少比特的数据，但是这个参数是可选的。
 * 需要注意到的是你可以使用util.inherit()来继承一个Readable流。
 * 为了说明只有在数据消耗者出现时，_read函数才会被调用，我们可以将上面的代码简单的修改一下：
 */
rs._read = function() {
  if (c >= 'z'.charCodeAt(0)) return rs.push(null);

  setTimeout(function() {
    rs.push(String.fromCharCode(++c));
  }, 100);
};

rs.pipe(process.stdout);

process.on('exit', function() {
  console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', process.exit);
// 运行上面的代码我们可以发现如果我们只请求5比特的数据，那么_read只会运行5次：
// node demo5.js | head -c5
// abcde
// _read() called 5 times

/**
 * 在上面的代码中，setTimeout很重要，因为操作系统需要花费一些时间来发送程序结束信号。
 * 另外,process.stdout.on('error',fn)处理器也很重要，因为当head不再关心我们的程序输出时，操作系统将会向我们的进程发送一个SIGPIPE信号，此时process.stdout将会捕获到一个EPIPE错误。
 * 上面这些复杂的部分在和操作系统相关的交互中是必要的，但是如果你直接和node中的流交互的话，则可有可无。
 */