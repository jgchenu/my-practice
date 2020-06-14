var fs = require("fs");
/**
 *
 * @param {*} src 复制文件路径
 * @param {*} dst 拷贝后的文件名
 */
function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
}
function main(argv) {
  copy(argv[0], argv[1]);
}
//node Buffer.js Buffer2.js
main(process.argv.slice(2));
