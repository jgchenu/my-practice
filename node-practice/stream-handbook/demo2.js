var http = require('http');
var fs = require('fs');
/**
 * 这是对于demo1 的优化，使用stream.pipe()
 */

 /**
 * 使用.pipe()方法还有别的好处，比如说它可以自动控制后端压力，以便在客户端连接缓慢的时候node可以将尽可能少的缓存放到内存中。
 * 想要将数据进行压缩？我们可以使用相应的流模块完成这项工作!
 * 通过上面的代码，我们成功的将发送到浏览器端的数据进行了gzip压缩。
 * 我们只是使用了一个oppressor模块来处理这件事情。
 * 
 * pipe
 * 无论哪一种流，都会使用.pipe()方法来实现输入和输出。
 * .pipe()函数很简单，它仅仅是接受一个源头src并将数据输出到一个可写的流dst中：
 * .pipe(dst)将会返回dst因此你可以链式调用多个流: 
 * a.pipe(b).pipe(c).pipe(d) 等价为：
 * a.pipe(b);
 * b.pipe(c);
 * c.pipe(d);
 */
var server = http.createServer(function(req, res) {
  var stream = fs.createReadStream(__dirname + '/data.txt');
  res.writeHead(200, {
    'Content-type': 'text/plain;charset=utf8'
  });
  stream.pipe(res);
});
server.listen(8000);
