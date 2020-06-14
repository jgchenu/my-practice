var fs = require('fs');
var ws = fs.createWriteStream('message.txt');
/**
 * 向一个writable流中写东西
 * 如果你需要向一个writable流中写东西，只需要调用.write(data)即可。
 */
ws.write('beep ');

setTimeout(function() {
  ws.end('boop\n');
}, 1000);
