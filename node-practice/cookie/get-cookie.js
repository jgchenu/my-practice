var http = require('http');
var url = require('url');
var util = require('util');

function handleCookie(req, res) {
  // 服务端拿到 请求头的cookie
  const cookie = req.headers['cookie'];
  const cookies = {};
  if (cookie) {
    const lists = cookie.split('; ');
    for (let i = 0; i < lists.length; i++) {
      const pairs = lists[i].split('=');
      cookies[pairs[0].trim()] = pairs[1];
    }
  }

  req.cookies = cookies;
}

function serialize(name, val, opt) {
  const pairs = [name + '=' + encodeURIComponent(val)];
  opt = opt || {};
  if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if (opt.domain) pairs.push('Domain=' + opt.domain);
  if (opt.path) pairs.push('Path=' + opt.path);
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');
  return pairs.join('; ');
}

function handleQuery(req, res) {
  req.query = url.parse(req.url, true).query;
}
/**
 * 服务端如何响应设置cookie呢？
 * Set-Cookie: name=value; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
 * 其中name=value是必须包含的部分，其余部分是可选参数。这些可选参数将会影响浏览器在后续将Cookie发送给服务器的行为
 * path表示这个Cookie影响到的路径，当前访问的路径不满足匹配时，浏览器则不发送这个cookie
 * Expire 表示cookie过期的时间（这个时间是以浏览器为标准），max-age表示cookie将在生成的多少时间之后过期，单位是s
 * HttpOnly告知浏览器不允许通过脚本document.cookie去获取或更改这个Cookie，事实上，设置HttpOnly之后，这个􏱖在document.cookie中不可见。但是是在HTTP请求的过程中，依然会发送这个Cookie到服务端。
 * Secure。当Secure值为true时，在HTTP中是无效的，在HTTPS中才有效，表示创建的cookie只能在HTTPS连接中被浏览器传递到服务端进行会话验证，如果是HTTP连接则不会传递该信息，所以很难被窃听到
 * */
http
  .createServer(function(req, res) {
    // req.headers 所有字段的key 都被lowerCase 全部小写了
    // 但是在res中，还是需要按照res.setHeader('Content-type','text/plain');的方式保持大小写
    handleCookie(req, res);
    handleQuery(req, res);
    const urlObjs = url.parse(req.url, true);
    if (urlObjs.pathname === '/setCookie') {
      const keys = Object.keys(req.query);
      if (keys.length > 0) {
        const cookies = keys.map(key => serialize(key, req.query[key]));
        // 要res.writeHead之后setHeader的返回头才会生效，
        // 值得注意的是，Set-Cookie是较少的，在报头中可能存在多个字段。为此res.setHeader的第二个参数可以是一个数组，如
        // res.setHeader('Set-Cookie', [serialize('foo', 'bar'), serialize('baz', 'val')]);
        // 这会在报文头部形成两条Set-Cookie字段：
        // Set-Cookie: foo=bar; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
        // Set-Cookie: baz=val; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
        res.setHeader('Set-Cookie', cookies);
      }
    }
    /**
      为了保证安全性，cookie无法设置除当前域名或者其父域名之外的其他domain。
      在此，分为两种情况：
      1.一种是前端范围内的是指cookie，如果网站的域名为，i.xiaohan.com,那么前端cookie的domain只能设置，i.xiaohan.com和其父域名xiaohan.com，如果设置成同级域名如api.xiaohan.com或者子域名api.i.xiaohan.com 那么cookie设置将无效。
      2.同样在服务端上，如果制定你的server服务的域名为server.xiaohan.com那么在服务端生成的cookie的domain只能指定为server.xiaohan.com或者xiaohan.com 其他domain都无法成功设置cookie。

      所以，如果你网页地址为i.xiaohan.com 而你请求地址为server.xiaohan.com， 那么在前端范围内，domain设置规则如上面第一种情况，而在服务器端设置cookie则将符合上述第二种情况。

      1.在setcookie中省略domain参数，那么domain默认为当前域名。
      2.domain参数可以设置父域名以及自身，但不能设置其它域名，包括子域名，否则cookie不起作用。

      cookie的作用域是domain本身以及domain下的所有子域名。例如设置xiaohan.com为domain的cookie时，只有该域名或者其子域名才能获取到这个cookie

      例如server.xiaohan.com发送请求的时候，服务器会自动带上server.xiaohan.com以及xiaohan.com域下的cookie

      前端设置可以直接通过chrome控制台输入 document.cookie = "example=2; expires=Mon, 11 Nov 2026 07:34:46 GMT; domain=test.com;path=/" 进行测试判断当前有没有成功写入cookie
     */
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.write(JSON.stringify(req.cookies));
    res.write('\r');
    res.end(util.inspect(urlObjs));
  })
  .listen(3000, function() {
    console.log('listent at 3000');
  });
