const http = require('http');
const server = http.createServer();
const chalk = require('chalk');
server.on('request', function(req, res) {
  res.writeHead(200, {
    'Content-type': 'text/plain'
  });
  res.end('Hello world ^_^')
});
server.listen(3000);
console.log(chalk.blue('listen at 3000'));