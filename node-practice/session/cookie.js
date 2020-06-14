/**
 * 第一种实现session：基于cookie来实现用户和数据的映射
 */
var sessions = {};
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

var generate = function() {
  var session = {};
  session.id = new Date().getTime() + Math.random();
  session.cookie = {
    expire: new Date().getTime() + EXPIRES
  };
  sessions[session.id] = session;
  return session;
};

function handleSession(req, res) {
  var id = req.cookies[key];
  if (!id) {
    req.session = generate();
  } else {
    var session = sessions[id];
    if (session) {
      if (session.cookie.expire > new Date().getTime()) {
        // 更新时时间
        session.cookie.expire = new Date().getTime() + EXPIRES;
        req.session = session;
      } else {
        // 超时了，删除旧的数据，并重新生成
        delete sessions[id];
        req.session = generate();
      }
    } else {
      // 如果session过期被删除了或者口令不对，重新生成session
      req.session = generate();
    }
  }
  handle(req, res);
}

var handle = function(req, res) {
  const writeHead = res.writeHead;
  res.writeHead = function() {
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize('Set-Cookie', req.session.id);
    cookies = Array.isArray(cookies)
      ? cookies.concat(session)
      : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
  };

  if (!req.session.isVisit) {
    res.session.isVisit = true;
    res.writeHead(200);
    res.end('欢迎第一次来动物园');
  } else {
    res.writeHead(200);
    res.end('动物园再次欢迎你');
  }
};
