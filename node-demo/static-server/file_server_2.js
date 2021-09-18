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
  readStream.pipe(res);
  readStream.on('error', error => {
    /**
     * 册一个error事件处理器，可以捕获任何可以预见或无法预见的错误，给客户端更优雅 的响应。
     */
    res.statusCode = 500;
    return res.end(error.message);
  });
  /**
   * 文件readStream 通过管道传输到HTTP响应中，res是一个WriteStream
   *
   * curl localhost:8000/jgchen.txt -i
   *
   * TTP/1.1 200 OK
   * Content-type: text/plain; charset=utf-8
   * Date: Fri, 09 Aug 2019 16:35:39 GMT
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * 我是陈建光，我是个小菜鸡。
   */
});

server.listen(8000, () => {
  console.log(chalk.blue('listen at 8000'));
});
