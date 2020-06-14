/**
 * 如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓
 * 我们可以根据 .write 方法的返回值来判断传入的数据是写入目标了，
 * 还是临时放在了缓存了，并根据 drain 事件来判断什么时候只写数据流已经将缓存中的数据写入目标，
 * 可以传入下一个待写数据了。因此代码可以改造如下:
 */

const fs = require("fs");
var [src, dst] = process.argv.slice(2);
console.log(src, dst);
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);
rs.setEncoding("UTF8");
rs.on("data", function(chunk) {
  if (ws.write(chunk,"UTF8") === false) {
    rs.pause();
  }
});
rs.on("end", function() {
  ws.end();
});
ws.on("drain", function() {
  rs.resume();
});
