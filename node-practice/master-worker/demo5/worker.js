var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('handled by child, pid is ' + process.pid + '\n');
  throw new Error('throw exception');
});

var worker;
process.on('message', function(m, tcp) {
  if (m === 'server') {
    worker = tcp;
    worker.on('connection', function(socket) {
      server.emit('connection', socket);
    });
  }
});

process.on('uncaughtException', function() {
  // 日志进行记录
  // logger.error(err);
  //停止接受新的连接
  process.send({ act: 'suicide' });
  worker.close(function() {
    // 所有连接已经断开后退出进程，不过这个需要下面的超时机制来强制退出
    process.exit(1);
  });
  // 这里存在的问题的是有可能我们的连接是长连接，不是HTTP服务的短接，等待长连接断开可能需要较长的时间
  // 5秒后退出进程
  setTimeout(function() {
    process.exit(1);
  }, 5000);
});
