const child_process = require('child_process');
//在 Linux 系统下，进程之间可以通过信号互相通信。以下是一个例子。
var child = child_process.spawn('node', ['child.js'], {
  stdio: [0, 1, 2, 'ipc']
});
child.on('message', function(msg) {
  console.log(msg);
});
