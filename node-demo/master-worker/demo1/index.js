var fork = require('child_process').fork;
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  fork('./worker.js');
}
/**
var cp = require('child_process');
cp.spawn('node', ['worker.js']);
cp.exec('node worker.js', function (err, stdout, stderr) {
// some code
 });
// execFile 允许的文件，首行需要添加 #!/usr/bin/env node
cp.execFile('worker.js', function (err, stdout, stderr) { // some code
}); cp.fork('./worker.js');
 */
