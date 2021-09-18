const http = require('http');
const chalk = require('chalk');
const fs = require('fs');
http
  .createServer(function(req, res) {
    res.writeHead(200, {
      'Content-type': 'text/plain',
    });
    fs.createReadStream('./output.txt', 'UTF-8').pipe(res);
  })
  .listen(3000);
console.log(chalk.blue('Server runing at 3000'));
