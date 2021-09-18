/**
 * openssl genrsa -out client.key 1024
 * openssl req -new -key client.key -out client.csr
 * openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt
 */
var fs = require('fs');
var tls = require('tls');
var options = {
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./ca.crt')]
};
var stream = tls.connect(8000, options, function() {
  console.log(
    'client connected',
    stream.authorized ? 'authorized' : 'unauthorized'
  );
  process.stdin.pipe(stream);
});
stream.setEncoding('utf8');
stream.on('data', function(data) {
  console.log(data);
});
stream.on('end', function() {
  console.log('stream end');
});
