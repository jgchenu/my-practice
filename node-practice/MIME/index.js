/**
 * 1. MIME
 */
res.writeHead(200, { 'Content-Type': 'text/plain' });
res.end('<html><body>Hello World</body></html>\n');
//

res.writeHead(200, { 'Content-Type': 'text/html' });
res.end('<html><body>Hello World</body></html>\n');
/**
 * 第一个在前端页面显示的是 <html><body>Hello world</body></html>，这个处理为纯文本
 * 第二个在前端页面显示的只有 Hello world，这个处理为html
 * 浏览器根据Content-Type的值来决定不同的渲染方式
 */

var mime = require('mime');
mime.lookup('/path/to/file.txt'); // => 'text/plain'
mime.lookup('file.txt'); // => 'text/plain'
mime.lookup('.TXT'); // => 'text/plain'
mime.lookup('htm'); // => 'text/html'
/**
 * 除了MIME外，Content-Type的􏱖中还可以包含一些参数，如字符集
 * Content-Type: text/javascript; charset=utf-8
 */

/**
 * 2.附件下载场景
 * Content- Disposition字段影响的行为是客户端会根据它的值将内容直接渲染出来还是作为附件进行下载
 * Content-Disposition: inline; 是作为响应内容直接渲染出来
 * Content-Disposition: attachment; filename="filename.ext" 作为附件下载，并且指定下载的文件名
 *
 * 以下是附件下载的api
 */
res.sendfile = function(filepath) {
  fs.stat(filepath, function(err, stat) {
    var stream = fs.createReadStream(filepath);

    // 设置内容
    res.setHeader('Content-Type', mime.lookup(filepath));
    // 设置长度
    res.setHeader('Content-Length', stat.size);
    // 设置为附件
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + path.basename(filepath) + '"'
    );
    res.writeHead(200);
    stream.pipe(res);
  });
};

/**
 * 3. 响应JSON
 */
res.json = function(json) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(json));
};
/**
 * 4.响应跳转
 */
res.redirect = function(url) {
  res.setHeader('Location', url);
  res.writeHead(302);
  res.end('Redirect to ' + url);
};
