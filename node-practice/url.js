const url = require("url");
const http = require("http");

/**
 * 处理 HTTP 请求时 url 模块使用率超高，因为该模块允许解析 URL、生成 URL，以及拼接 URL。
 * 首先我们来看 看一个完整的 URL 的各组成部分。
 */
console.log(url.parse("http://user:pass@host.com:8080/p/a/t/h?query=string#hash"));
/* =>
{ 
protocol: 'http:',
slashes: true,
auth: 'user:pass',
host: 'host.com:8080', 
port: '8080',
hostname: 'host.com', 
hash: '#hash',
search: '?query=string', 
query: 'query=string', 
pathname: '/p/a/t/h',
path: '/p/a/t/h?query=string',
href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' } 
*/
/**
 * 传给 .parse 方法的不一定要是一个完整的 URL，
 * 例如在 HTTP 服务器回调函数中，request.url 不包含协议头和域名，但同样可以用 .parse 方法解析。
 */
http
  .createServer(function(request, response) {
    var tmp = request.url; // => "/foo/bar?a=b"
    console.log(request.headers)
    console.log(url.parse(tmp));
    /* =>
  { protocol: null, 
    slashes: null,
    auth: null,
    host: null,
    port: null, 
    hostname: null, 
    hash: null,
    search: '?a=b', 
    query: 'a=b', 
    pathname: '/foo/bar', 
    path: '/foo/bar?a=b', 
    href: '/foo/bar?a=b' 
  }
  */
  })
  .listen(3000);

/**
 * .parse 方法还支持第二个和第三个布尔类型可选参数。
 * 第二个参数等于 true 时，该方法返回的 URL 对象中，query 字段不再是一个字符串，而是一个经过 querystring 模块转换后的参数对象。
 * 第三个参数等于 true 时，该 方法可以正确解析不带协议头的 URL，例如 //www.example.com/foo/bar 。
 */

/**
 * 反过来，format 方法允许将一个 URL 对象转换为 URL 字符串，示例如下。
 */
console.log(url.format({
  protocol: "http:",
  host: "www.example.com",
  pathname: "/p/a/t/h",
  search: "query=string"
}));
/* => 'http://www.example.com/p/a/t/h?query=string' */

/**
 * 另外， .resolve 方法可以用于拼接 URL，示例如下。
 */

console.log(url.resolve("http://www.example.com/foo/bar", "../baz"));
/* =>
http://www.example.com/baz
*/
