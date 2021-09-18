var http = require("http");
var url = require("url");
var util = require("util");

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    console.log('child_process get-1.js')
    res.end(util.inspect(url.parse(req.url, true)));
  })
  .listen(3000);
