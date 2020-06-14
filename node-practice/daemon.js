const child_process = require('child_process');

/**
 * 如何守护子进程
 * 守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程，保障工作进程不间断运行。
 * 以下是一种实现方式。
 * @param {*} mainModule 
 */
function spawn(mainModule) {
  var worker = child_process.spawn('node', [mainModule]);
  worker.on('exit', function(code) {
    if (code !== 0) {
      spawn(mainModule);
    }
  });
}

spawn(process.argv.slice(2)[0]);
