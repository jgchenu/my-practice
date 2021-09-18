const process = require('process');

process.on('message', function(msg) {
  msg.hello = msg.hello.toUpperCase();
  process.send(msg);
});
