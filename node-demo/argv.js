/**
 * process 是一个全局变量，可通过 process.argv 获得命令行参数。
 * 由于 argv[0] 固定等于 NodeJS 执行程序的绝对路径，argv[1] 固定等于主模块的绝对路径，
 * 因此第一个命令行参数从 argv[2] 这个位置开始。
 */
const fs = require('fs');

//  /Users/jgchen/.nvm/versions/node/v8.14.1/bin/node,/Users/jgchen/Desktop/node-practice/argv.js,jgchen
console.log(process.argv.join(','))
