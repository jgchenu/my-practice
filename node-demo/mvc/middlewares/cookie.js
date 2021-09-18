// cookie解析中间件
var cookie = function( req, res, next) {
  var cookie = req.headers.cookie;
  var cookies = {};
  if (cookie) {
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++) {
      var pair = list[i].split('=');
      cookies[pair[0].trim()] = pair[1];
    }
  }
  req.cookies = cookies;
  next();
};

module.exports = cookie;
