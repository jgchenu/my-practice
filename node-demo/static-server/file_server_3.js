const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const root = __dirname;
const server = http.createServer((req, res) => {
  const urlParams = url.parse(req.url);
  const pathname = urlParams.pathname;
  const filePath = path.join(root, pathname);
  fs.stat(filePath, (err, stat) => {
    if (err) {
      if ('ENOENT' === err.code) {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.end('Internet error');
      }
    } else {
      res.setHeader('Content-Length', stat.size);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
      readStream.on('error', err => {
        res.statusCode = 500;
        res.end(err.message);
      });
    }
  });
});
server.listen(8000, () => {
  console.log(chalk.blue('listen at port 8000'));
});
