const os = require('os');
// os 的模块可以用于查看操作系统的总内存跟闲置内存
console.log((os.totalmem()/1024/1024).toFixed(0)); // 系统的总内存
console.log((os.freemem()/1024/1024).toFixed(0));// 系统的闲置内存 

