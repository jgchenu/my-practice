/**
 * process 是一个全局变量，即 global 对象的属性。
 * 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
 * 通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
 */
process.on("exit", function(code) {
  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);

  console.log("退出码为:", code);
});
console.log("程序执行结束");

// 输出到终端
process.stdout.write("Hello World!" + "\n");

// 通过环境变量参数读取
console.log(process.argv);
// 获取执行路径
console.log(process.execPath);

// 平台信息
console.log(process.platform);

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());