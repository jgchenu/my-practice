const child_process = require('child_process');
var child = child_process.spawn('node', ['get-1.js']);
child.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
  console.log('stderr: ' + data);
});
child.on('close', function(code) {
  console.log('child process exited with code ' + code);
});
