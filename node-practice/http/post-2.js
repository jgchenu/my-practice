const http = require("http");

http
  .createServer(function(request, response) {
    var body = [];
    console.log(request.method);
    console.log(request.headers);
    response.writeHead(200, { "Content-type": "application/json" });
    request.on("data", function(chunk) {
      body.push(chunk);
    });
    request.on("end", function() {
      body = Buffer.concat(body);
      if (body && request.method === "POST") {
        console.log(body);
        console.log(JSON.parse(body));
      }
      response.end(body);
    });
  })
  .listen(3000);

  /**
  Buffer.concat = function(list, length) { if (!Array.isArray(list)) {
    throw new Error('Usage: Buffer.concat(list, [length])'); }
    if (list.length === 0) { return new Buffer(0);
    } else if (list.length === 1) { return list[0];
    }
    if (typeof length !== 'number') {
    length = 0;
    for (var i = 0; i < list.length; i++) {
    var buf = list[i];
    length += buf.length; }
    }
    var buffer = new Buffer(length); varpos=0;
    for (var i = 0; i < list.length; i++) {
    var buf = list[i]; buf.copy(buffer, pos); pos += buf.length;
    }
    return buffer; 
  };
   */