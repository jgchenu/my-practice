var https = require('https');
var fs = require('fs');
2;
var options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('./key.pem'),
  // ca: [fs.readFileSync('./ca.crt')],需要设置ca 证书保证准确性
  // 否则就用这个忽略验证，但是不能保证证书的正确性，还是会有中间人伪造
  rejectUnauthorized:false
};
options.agent = new https.Agent(options);
var req = https.request(options, function(res) {
  res.setEncoding('utf-8');
  res.on('data', function(d) {
    console.log(d);
  });
});
req.end();
req.on('error', function(e) {
  console.log(e);
});
