/* 
假设我们的博客有这样一个留言程序，提交留言的接口如下
http://domain_a.com/guestbook 
服务端自动从session数据中，判断是谁提交的数据，补足username跟updateAt两个字段后向数据库写入数据
*/
function handleLogin(req, res) {
  var content = req.body.content || '';
  var username = req.session.username;
  var feedback = {
    username: username,
    content: content,
    updatedAt: Date.now()
  };
  db.save(feedback, function(err) {
    res.writeHead(200);
    res.end('Ok');
  });
}
/*
在 http://domain_b.com/attack 上构建了以下这样一个表单提交

<form id="test" method="POST" action="http://domain_a.com/guestbook">
 <input type="hidden" name="content" value="vim是linux的编辑器" />
</form>
<script type="text/javascript">
$(function () { $("#test").submit();
}); 
</script>

攻击者只要诱导某个domain_a的用户访问domain_b的网站，就会自动提交这个留言
由于在提交domain_a的过程中，浏览器会携带domain_a的cookie发送到浏览器，尽管这个请求是来自于domain_b的，但是服务器跟用户都不知情
*/

/**
 * csrf的解决方案：添加随机值的方式
 */
var generateRandom = function(len) {
  return crypto
    .randomBytes(Math.ceil((len * 3) / 4))
    .toString('base64')
    .slice(0, len);
};
var token = req.session._csrf || (req.session._csrf = generateRandom(24));
<form id="test" method="POST" action="http://domain_a.com/guestbook">
  <input type="hidden" name="content" value="vim是􏻼􏻽􏻾􏻿上􏼀􏼁的编辑器" />{' '}
  <input type="hidden" name="_csrf" value="<%=_csrf%>" />
</form>;
function handleCsrf(req, res) {
  var token = req.session._csrf || (req.session._csrf = generateRandom(24));
  var _csrf = req.body._csrf;
  if (token !== _csrf) {
    res.writeHead(403);
    res.end('􏼊􏻶访问');
  } else {
    handleLogin(req, res);
  }
}
// _csrf字段也可以存在于查询字符串或者请求头中
