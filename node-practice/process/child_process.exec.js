const child_process = require('child_process');
const util = require('util');

function copy(source, target, callback) {
  child_process.exec(util.format('cp -r %s/* %s', source, target), callback);
}

copy('module', 'router');
