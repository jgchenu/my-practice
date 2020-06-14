var buf = Buffer.from("runoob", "ascii");

// 输出 72756e6f6f62
console.log(buf.toString("hex"));

// 输出 cnVub29i
console.log(buf.toString("base64"));

// 创建一个长度为 10、且用 0 填充的 Buffer。
// <Buffer 00 00 00 00 00 00 00 00 00 00>
var buf1 = Buffer.alloc(10);
console.log(buf1);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
//<Buffer 01 01 01 01 01 01 01 01 01 01>
var buf2 = Buffer.alloc(10, 1);
console.log(buf2);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
// <Buffer 28 c4 81 03 01 00 00 00 28 c4>
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
// <Buffer 01 02 03>
const buf4 = Buffer.from([1, 2, 3]);
console.log(buf4);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
// <Buffer 74 c3 a9 73 74>
const buf5 = Buffer.from("tést");
console.log(buf5);

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
// <Buffer 74 e9 73 74>
const buf6 = Buffer.from("tést", "latin1");
console.log(buf6);

buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString("ascii")); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString("ascii", 0, 5)); // 输出: abcde
console.log(buf.toString("utf8", 0, 5)); // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde

buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);

var buffer1 = Buffer.from("菜鸟教程");
var buffer2 = Buffer.from("www.runoob.com");
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());

var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());

var buffer = Buffer.from('www.runoob.com');
//  缓冲区长度
console.log("buffer length: " + buffer.length);