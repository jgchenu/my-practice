/**
 * If-Modified-Since: Sun, 03 Feb 2013 06:01:12 GMT
 * 缺点： 文件的时间戳改动但是内容没改变
 * 时间戳只能精确到秒级别，更新频繁
 */
var handle = function(req, res) {
  fs.stat(filename, function(err, stat) {
    var lastModified = stat.mtime.toUTCString();
    if (lastModified === req.headers['if-modified-since']) {
      res.writeHead(304, 'Not Modified');
      res.end();
    } else {
      fs.readFile(filename, function(err, file) {
        res.setHeader('Last-Modified', lastModified);
        res.writeHead(200, 'Ok');
        res.end(file);
      });
    }
  });
};
// 引入ETag: 根据内容计算散列值
var getHash = function(str) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(str).digest('base64');
};

var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    var hash = getHash(file);
    var noneMatch = req.headers['if-none-match'];
    if (hash === noneMatch) {
      res.writeHead(304, 'Not Modified');
      res.end();
    } else {
      res.setHeader('ETag', hash);
      res.writeHead(200, 'Ok');
      res.end(file);
    }
  });
};

var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    var hash = getHash(file);
    var noneMatch = req.headers['if-none-match'];
    if (hash === noneMatch) {
      res.writeHead(304, 'Not Modified');
      res.end();
    } else {
      res.setHeader('ETag', hash);
      res.writeHead(200, 'Ok');
      res.end(file);
    }
  });
};
