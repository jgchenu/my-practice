// 'use strict';
// const cluster = require('cluster');

// if (cluster.isMaster) {
//   const worker = cluster.fork();
//   worker.send('hi there');
//   worker.on('message', (msg) => {
//     console.log(`msg: ${msg} from worker#${worker.id}`);
//   });
// } else if (cluster.isWorker) {
//   process.on('message', (msg) => {
//     process.send(msg);
//   });
// }

const child = require('child_process')

const num = 10000;

for (let i = 0; i < num; i++) {
  child.exec(`curl http://127.0.0.1:7001/detail/${i}`)
}