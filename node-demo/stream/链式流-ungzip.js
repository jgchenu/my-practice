var fs = require("fs");
var zlib = require("zlib");

// 解压input.txt.gz 文件为input.txt(
fs.createReadStream("input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("input.txt"));
