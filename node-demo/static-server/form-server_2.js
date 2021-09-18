const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const items = [];
const FORMDATA = 'multipart/form-data';
const formidable = require('formidable');
const uploadDir = './upload/';
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        upload(req, res);
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
  <form method='post' action='/' enctype='multipart/form-data'> 
    <p>user:<input type='text' name='user'/></p>
    <p>password:<input type='password' name='password'/></p>
    <p><input type='file' name='jgchen'/></p>
    <p><input type='submit' value='上传' /></p>
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

function upload(req, res) {
  if (!isFormData(req)) {
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    return res.end('BAD REQUEST: expecting content-type: multipart/form-data');
  }

  const form = new formidable.IncomingForm();

  form.on('progress', (received, expected) => {
    const percent = Math.floor((received / expected) * 100);
    console.log(chalk.yellow(percent));
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      return res.end(err.message);
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdir(uploadDir);
    }

    //拿到扩展名
    const extname = path.extname(files.jgchen.name);
    //旧的路径
    const oldpath = files.jgchen.path;
    //新的路径
    const time = Date.now();
    const newpath = path.join(__dirname, uploadDir) + time + extname;
    console.log(oldpath, newpath);
    //改名
    fs.rename(oldpath, newpath, err => {
      if (err) {
        console.error(err.message);
        res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
        return res.end(err.message);
      }
      res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
      const messages = Object.assign(fields, {
        oldpath,
        newpath,
        extname,
        fileKeys: Object.keys(files)
      });
      res.end(JSON.stringify(messages));
    });

    // console.log(fields);
    // console.log(files);
  });
}

function isFormData(req) {
  const type = req.headers['content-type'] || '';
  return type.indexOf(FORMDATA) === 0;
}
