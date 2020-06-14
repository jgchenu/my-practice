var http = require("http");
var url = require("url");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain;charset:utf-8" });
    // 解析 url 参数
    // parseQueryString <boolean> 如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象。 如果设为 false，则 query 会是一个未解析未解码的字符串。 默认为 false。
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
  })
  .listen(3000);
