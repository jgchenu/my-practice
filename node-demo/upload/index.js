// 通过请求头的Transfer-Encoding和Content-Length可以判断请求中是否带有内容
var hasBody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};
function handleUpload(req, res) {
  if (hasBody(req)) {
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });
    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      handle(req, res);
    });
  } else {
    handle(req, res);
  }
}
