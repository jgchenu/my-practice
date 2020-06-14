const http = require("http");
const url = require("url");
const querystring = require("querystring");

function start(route) {
  function onRequest(request, response) {
    const pathUrl = url.parse(request.url);
    const pathname = pathUrl.pathname;
    route(pathname);

    console.log(querystring.parse(pathUrl.query));
    response.writeHead(200, { "Content-type": "text/plain" });
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;
