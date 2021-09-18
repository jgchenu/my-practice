// querystring解析中间件
const errorHandler = function(err, req, res, next) {
  // 因为现在的逻辑是，errorHandler什么情况也会被匹配到，什么时候触发这个error错误处理呢，只有传给new Error对象才进行错误处理，否则按照正常的逻辑走下去
  if (err instanceof Error) {
    res.writeHead(500, 'Internet Error');
    res.end(err.message);
    next(err);
  }
  next(req, res, next);
};

module.exports = querystring;
