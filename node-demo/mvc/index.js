const util = require('./util');
const cookieMiddleware = require('./middlewares/cookie');
const queryMiddleware = require('./middlewares/querystring');
const errorMiddleware = require('./middlewares/errorhandler');
var routes = { all: [] };
var app = {};

var match = function(pathname, routes) {
  var stacks = [];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    // 正则匹配
    var reg = route.path.regexp;
    var matched = reg.exec(pathname);
    if (matched) {
      stacks = stacks.concat(route.stack);
    }
  }
  return stacks;
};

var matchController = function(pathname, routes) {
  var stacks = [];
  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    // 正则匹配
    var reg = route.path.regexp;
    var matched = reg.exec(pathname);
    if (matched) {
      // 如何匹配到了，那么把params参数设置进去
      var params = {};
      for (vari = 0, l = keys.length; i < l; i++) {
        var value = matched[i + 1];
        if (value) {
          params[keys[i]] = value;
        }
      }
      req.params = Object.assign(req.params, params);
      stacks = stacks.concat(route.stack);
    }
  }
  return stacks;
};

var handle = function(req, res, stack) {
  var next = function(err) {
    if (err) {
      return handle500(err, req, res, stack);
    }
    // 从stack数组中取出中间件递归执行
    var middleware = stack.shift();
    if (middleware) {
      try {
        // 传入next()函数自身使中间件能执行结束后递归
        middleware(req, res, next);
      } catch (error) {
        next(err);
      }
    }
  };
  // 启动执行
  next();
};

app.use = function(path) {
  var handle;
  if (typeof path === 'string') {
    handle = {
      path: util.pathRegexp(path),
      stack: Array.prototype.slice.call(arguments, 1)
    };
  } else {
    handle = {
      path: util.pathRegexp('/'),
      stack: Array.prototype.slice.call(arguments, 0)
    };
  }
  routes.all.push(handle);
};

['get', 'put', 'delete', 'post'].forEach(function(method) {
  routes[method] = [];
  app[method] = function(path, action) {
    routes[method].push([pathRegexp(path), action]);
  };
});

//  stack有两种函数，一种是中间件，一种是命中路由的控制器函数
//  一种是app.use(path,fn); 一种是 app.get(path,fn)的方法回调
function handleRoute(req, res) {
  var pathname = url.parse(req.url).pathname; // 将请求方法变为小写
  var method = req.method.toLowerCase();
  // 获取all方法里的中间件
  var stacks = match(pathname, routes.all);
  if (routes.hasOwnPerperty(method)) {
    // 根据请求方法分发不同的controller处理函数,并且将req.params 挂载
    stacks.concat(matchController(pathname, routes[method]));
  }
  if (stacks.length) {
    handle(req, res, stacks);
  } else {
    // 处理404请求
    handle404(req, res);
  }
}

var handle500 = function(err, req, res, stack) {
  // 筛选出有异常处理的中间件
  stack = stack.filter(function(middleware) {
    // 判断形参个数为4的函数,也就是负责错误处理的函数
    return middleware.length === 4;
  });
  var next = function() {
    // 从stack数组中取出中间件执行
    var middleware = stack.shift();
    if (middleware) {
      // 传递异常对象
      middleware(err, req, res, next);
    }
  };
  // 启动执行
  next();
};

app.use('/user/', cookieMiddleware);
app.use(queryMiddleware);
app.use(errorMiddleware);

app.get('/user/:name', function(req, res) {
  console.log(req.params);
});
