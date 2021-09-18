var http = require('http');
var fs = require('fs');

/**
 * 这是一个不好的例子，在每次请求时，我们都会把整个data.txt文件读入到内存中，然后再把结果返回给客户端。
 * 想想看，如果data.txt文件非常大，在响应大量用户的并发请求时，程序可能会消耗大量的内存，这样很可能会造成用户连接缓慢的问题。
 * 其次，上面的代码可能会造成很不好的用户体验，因为用户在接收到任何的内容之前首先需要等待程序将文件内容完全读入到内存中。
 */



var server = http.createServer(function(req, res) {
  fs.readFile(__dirname + '/data.txt', function(err, data) {
    res.end(data);
  });
});
server.listen(8000);
