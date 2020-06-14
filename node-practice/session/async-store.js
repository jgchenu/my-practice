/**
 * 用第三方缓存去保存session
 */

function handleSession(req, res) {
  var id = req.cookies[key];
  if (!id) {
    req.session = generate();
    handle(req, res);
  } else {
    store.get(id, function(err, session) {
      if (session) {
        if (session.cookie.expire > new Date().getTime()) {
          // 更新超时时间
          session.cookie.expire = new Date().getTime() + EXPIRES;
          req.session = session;
        } else {
          // 超时了，删除旧的数据，并重新生成
          req.session = generate();
        }
      } else {
        // 如果session过期被删除了或者口令不对，重新生成session
        req.session = generate();
      }
      handle(req, res);
    });
  }
}

var handle = function(req, res) {
  var writeHead = res.writeHead;
  res.writeHead = function() {
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize('Set-Cookie', req.session.id);
    cookies = Array.isArray(cookies)
      ? cookies.concat(session)
      : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    // 保存回缓存
    store.save(req.session);
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
