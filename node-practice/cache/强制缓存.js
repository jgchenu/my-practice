/**
 * Expires: Expires是一个GMT格式的时间字符串
 * If-Modified-Since: Sun, 03 Feb 2013 06:01:12 GMT
 * Expires的缺陷在于浏览器与服务端之间的时间可能不一致，Expires是浏览器端设置的
 * 
 */
var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    var expires = new Date();
    expires.setTime(expires.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
    res.setHeader('Expires', expires.toUTCString());
    res.writeHead(200, 'Ok');
    res.end(file);
  });
};

/**
 * Cache-Control:max-age=36000; 单位毫秒
 */
var handle = function(req, res) {
  fs.readFile(filename, function(err, file) {
    res.setHeader('Cache-Control', 'max-age=' + 10 * 365 * 24 * 60 * 60 * 1000);
    res.writeHead(200, 'Ok');
    res.end(file);
  });
};

/**
 * 如果浏览器两个值都存在，并且都支持，那么max-age优先级会比expires高
 */