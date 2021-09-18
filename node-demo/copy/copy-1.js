/**
 * smallCopy的程序拷贝一些小文件没啥问题，但这种一次性把所有文件内容都读取到内存中后再一次性写入磁盘的方式不适合拷贝大文件，内存会爆仓。
 * 对于大文件，我们只能读一点写一点，直到完成拷贝。因此上边的程序需要改造如下。
 */

/**
 *
 * @param {*} src 复制文件路径
 * @param {*} dst 拷贝后的文件名
 */
var fs = require("fs");
function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}
function main(argv) {
  copy(argv[0], argv[1]);
}
main(process.argv.slice(2));
/**
 * 以上程序使用 fs.createReadStream 创建了一个源文件的只读数据流，
 * 并使用 fs.createWriteStream 创建了 一个目标文件的只写数据流，并且用 pipe 方法把两个数据流连接了起来。
 * 连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。
 */
