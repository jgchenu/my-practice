var Readable = require('stream').Readable;
/**
 * 创建一个readable流
 */
var rs = new Readable();
rs.push('beep ');
rs.push('boop\n');
/**
 * 在上面的代码中rs.push(null)的作用是告诉rs输出数据应该结束了。
 * 需要注意的一点是我们在将数据输出到process.stdout之前已经将内容推送进readable流rs中，但是所有的数据依然是可写的。
 * 这是因为在你使用.push()将数据推进一个readable流中时，一直要到另一个东西来消耗数据之前，数据都会存在一个缓存中。
 */
rs.push(null);
rs.pipe(process.stdout);
