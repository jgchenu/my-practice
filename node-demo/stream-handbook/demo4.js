var Readable = require('stream').Readable;
var rs = Readable();
/**
 * 在更多的情况下，我们想要的是当需要数据时数据才会产生，以此来避免大量的缓存数据。
 * 我们可以通过定义一个._read函数来实现按需推送数据:在这里我们将字母a到z推进了rs中，但是只有当数据消耗者出现时，数据才会真正实现推送。
 */
var c = 97;
rs._read = function () {
    rs.push(String.fromCharCode(c++));
    if (c > 'z'.charCodeAt(0)) rs.push(null);
};

rs.pipe(process.stdout);