// querystring解析中间件
const querystring = function(req, res, next) {
  req.query = url.parse(req.url, true).query;
  next();
};

module.exports = querystring;
