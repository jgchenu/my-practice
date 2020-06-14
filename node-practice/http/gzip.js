const http = require('http');
const zlib = require('zlib');
http
  .createServer(function(request, response) {
    var i = 1024,
      data = '';

    while (i--) {
      data += '.';
    }

    if (request.headers['accept-encoding'] || ''.indexOf('gzip') !== -1) {
      zlib.gzip(data, function(err, data) {
        response.writeHead(200, {
          'Content-type': 'text/plain;charset:utf-8',
          'Content-Encoding': 'gzip'
        });
        response.end(data);
      });
    } else {
      response.writeHead(200, {
        'Content-type': 'text/plain'
      });
      response.end(data);
    }
  })
  .listen(3000);
