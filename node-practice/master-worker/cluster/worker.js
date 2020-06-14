var http = require('http');
http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('handled by child, pid is ' + process.pid + '\n');
  })
  .listen(8000);
