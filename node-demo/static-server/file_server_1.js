const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const querystring = require('querystring');
// __dirname 在Node中是一个神奇的变量，它的值是该文件所在目录的路径
const root = __dirname;

const server = http.createServer((req, res) => {
  const params = url.parse(req.url);
  console.log(JSON.stringify(querystring.parse(params.query)));
  const pathname = params.pathname;
  /**
   * 假如 访问http://localhost:8000/jgchen?a=1
   * path.join(__dirname, pathname) === /Users/jgchen/Desktop/前端/node-practice/static-server/jgchen
   * path.resolve(_dirname, pathname) === /jgchen
   * url.parse(req.url).query === 'a=1'
   * querystring.parse(url.parse(req.url).query) === { a:1 }
   */
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  const readPath = path.join(root, pathname);
  // const exists = fs.existsSync(readPath);
  // if (!exists) return;
  const readStream = fs.createReadStream(readPath);

  readStream.on('data', chunk => {
    res.write(chunk);
  });

  readStream.on('end', () => {
    res.end(); // 文件写完结束响应，如果没有调用res.end() 服务会挂起，会超时无响应。
  });
  
  readStream.on('error', error => {
    /**
     * 册一个error事件处理器，可以捕获任何可以预见或无法预见的错误，给客户端更优雅 的响应。
     */
    res.statusCode = 500;
    res.end(error.message);
  });
});

server.listen(8000, () => {
  console.log(chalk.blue('listen at 8000'));
});
