/**
 * 第二种：通过查询字符串来实现浏览器端和服务器端数据的对应
 */
var getURL = function(_url, key, value) {
  var obj = url.parse(_url, true);
  obj.query[key] = value;
  return url.format(obj);
};

function handleSession(req, res) {
  var redirect = function(url) {
    res.setHeader('Location', url);
    res.writeHead(302);
    res.end();
  };
  var id = req.query[key];
  if (!id) {
    var session = generate();
    redirect(getURL(req.url, key, session.id));
  } else {
    var session = sessions[id];
    if (session) {
      if (session.cookie.expire > new Date().getTime()) {
        // 更新超时时间
        session.cookie.expire = new Date().getTime() + EXPIRES;
        req.session = session;
        handle(req, res);
      } else {
        // 超时了，删除旧的数据，并重新生成
        delete sessions[id];
        var session = generate();
        redirect(getURL(req.url, key, session.id));
      }
    } else {
      // 如果session过期被删除了或者口令不对，重新生成session
      var session = generate();
      redirect(getURL(req.url, key, session.id));
    }
  }
}
