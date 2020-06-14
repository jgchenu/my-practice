/**
 * 生成私钥:
 * openssl genrsa 1024 > key.pem
 *
 * 创建证书需要私钥。输入下面的命令会生成名为key-cert.pem的证书:
 * openssl req -x509 -new -key  key.pem > key-cert.pem
 */
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
  // 需要设置ca 证书保证准确性
};
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('hello world');
});

server.listen(8000, () => {
  console.log('https listen at 8000');
});

/**
curl localhost:8000

curl: (60) SSL certificate problem: self signed certificate
More details here: https://curl.haxx.se/docs/sslcerts.html

curl performs SSL certificate verification by default, using a "bundle"
 of Certificate Authority (CA) public keys (CA certs). If the default
 bundle file isn't adequate, you can specify an alternate file
 using the --cacert option.
If this HTTPS server uses a certificate signed by a CA represented in
 the bundle, the certificate verification probably failed due to a
 problem with the certificate (it might be expired, or the name might
 not match the domain name in the URL).
If you'd like to turn off curl's verification of the certificate, use
 the -k (or --insecure) option.
HTTPS-proxy has similar options --proxy-cacert and --proxy-insecure

由于是自签名证书，curl工具无法验证服务端证书的正确性，所以出现了上述的抛错
两种解决方式：

curl -k localhost:8000  -k忽略掉证书的验证
> hello world

curl --cacert ca.crt localhost:8000  告知CA证书使其完成对服务器证书的验证
> hello world
 */
