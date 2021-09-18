const http = require("http");
const zlib = require("zlib");

var options = {
  hostname: "localhost",
  port: 3000,
  method: "GET",
  headers: {
    "Accept-Encoding": "gzip,deflate"
  }
};
http
  .request(options, function(response) {
    var body = [];
    response.on("data", function(chunk) {
      body.push(chunk);
    });
    response.on("end", function() {
      console.log(body)
      body = Buffer.concat(body);
      if (response.headers["content-encoding"] === "gzip") {
        zlib.gunzip(body, function(err, data) {
          console.log(data.toString());
        });
      } else {
        console.log(body);
      }
    });
  })
  .end();
