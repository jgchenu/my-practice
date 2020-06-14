/**
 * https 模块与 http 模块极为类似，区别在于 https 模块需要额外处理 SSL 证书。
 * 在服务端模式下，创建一个 HTTPS 服务器的示例如下。
 */
const https = require('https');

var options = {
  key: fs.readFileSync('./ssl/default.key'),
  cert: fs.readFileSync('./ssl/default.cer')
};
var server = https.createServer(options, function(request, response) {
  // ...
});

/**
 * 另外，NodeJS 支持 SNI 技术，可以根据 HTTPS 客户端请求使用的域名动态使用不同的证书，
 * 因此同一个 HTTPS 服务器可以使用多个域名提供服务。
 * 接着上例，可以使用以下方法为 HTTPS 服务器添加多组证书。
 */
server.addContext('foo.com', {
  key: fs.readFileSync('./ssl/foo.com.key'),
  cert: fs.readFileSync('./ssl/foo.com.cer')
});
server.addContext('bar.com', {
  key: fs.readFileSync('./ssl/bar.com.key'),
  cert: fs.readFileSync('./ssl/bar.com.cer')
});

/**
 * 在客户端模式下，发起一个 HTTPS 客户端请求与 http 模块几乎相同，示例如下。
 * 但如果目标服务器使用的 SSL 证书是自制的，不是从颁发机构购买的，默认情况下 https 模块会拒绝连接，
 * 提示 说有证书安全问题。在 options 里加入 rejectUnauthorized: false 字段可以禁用对证书有效性的检查，
 * 从而允许 https 模块请求开发环境下使用自制证书的 HTTPS 服务器。
 */

var options = {
  hostname: 'www.example.com',
  port: 443,
  path: '/',
  method: 'GET'
};
var request = https.request(options, function(response) {});
request.end();
