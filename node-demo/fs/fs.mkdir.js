/**
 * 创建目录
 * 以下为创建目录的语法格式：
 * fs.mkdir(path[, options], callback)
 * path - 文件路径。
 * options 参数可以是：
 * recursive - 是否以递归的方式创建目录，默认为 false。 需要node11以上版本才能支持，之前8.9不支持
 * mode - 设置目录权限，默认为 0777。
 * callback - 回调函数，没有参数。
 */
var fs = require("fs");

// 可以添加 recursive: true 参数，不管创建的目录 /tmp 和 /tmp/a 是否存在：
fs.mkdir('./tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('目录递归创建成功')
});

// tmp 目录必须存在
console.log("创建目录 /tmp/test/");
fs.mkdir("./tmp/test/", function(err) {
  if (err) {
     return console.error(err);
  }
  console.log("目录创建成功。");
});
