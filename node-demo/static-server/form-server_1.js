const http = require('http');
const chalk = require('chalk');
const items = [];
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break;
      default:
        badRequest(req, res);
    }
  } else {
    notFound(res);
  }
});

server.listen(8000, () => {
  console.log(chalk.blue('listen at 8000'));
});

function show(res) {
  const html = `<html><head><title>Todo List</title></head><body>
  <h1>Todo List</h1>
  <ul>
    ${items
      .map(function(item) {
        return `<li>${item}</li>`;
      })
      .join('')}
  </ul>
  <form method='post' action='/'> 
    <p><input type='text' name='item'/></p>
    <p><input type='submit' value='添加' /></p>
  </form>
  </body></html>`;
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': Buffer.byteLength(html)
  });
  res.end(html);
}

function notFound(res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.end('404 NOT FOUND');
}

function badRequest(res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.end('BAD REQUEST');
}

function add(req, res) {
  const body = [];
  /**
   * 不带file数据时，Content-Type是application/x-www-form-urlencoded， 这也是HTML表单的默认值。
   * 带file数据时，Content-Type是multipart/form-data, 这是个适用于BLOB(大型二进制文件)的MIME类型。
   * 提交该file数据的表单，需要设置form的enctype='multipart/form-data'
   * 兼容上传图片的方式，可以生成该隐藏表单，然后触发submit input 的点击事件: submitEL.click(),同时return false;阻止默认行为
   */
  req.on('data', chunk => {
    body.push(chunk);
  });
  req.on('end', () => {
    const str = Buffer.concat(body).toString();
    const strObj = qs.parse(str);
    console.log(strObj);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(strObj));
  });
}
