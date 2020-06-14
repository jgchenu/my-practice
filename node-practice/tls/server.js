/**
 * 自己扮演CA机构，给自己的服务端颁发签名证书
 * CA的作用是为站点颁发证书，且这个证书中具有CA机构通过自己的公钥跟私钥实现的签名
 * openssl genrsa -out ca.key 1024 // 生成CA机构的私钥
 * openssl req -new -key ca.key -out ca.csr // 生成CA机构的CSR（证书签名请求）文件
 * openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt // 通过私钥自签名生成证书
 */

/**
 * openssl genrsa -out server.key 1024 生成服务端私钥
 * openssl req -new -key server.key -out server.csr  生成CSR文件
 * openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
 * 向我们的CA机构，申请服务端的签名证书，签名过程需要CA的证书跟私钥参与，最终颁发一个带有CA签名的证书
 */

var tls = require('tls');
var fs = require('fs');
var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  requestCert: true,
  ca: [fs.readFileSync('./ca.crt')]
};
var server = tls.createServer(options, function(stream) {
  console.log(
    'server connected',
    stream.authorized ? 'authorized' : 'unauthorized'
  );
  stream.write('welcome!\n');
  stream.setEncoding('utf8');
  stream.pipe(stream);
});
server.listen(8000, function() {
  console.log('server bound');
});
