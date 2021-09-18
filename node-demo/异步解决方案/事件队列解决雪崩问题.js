const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
const fs = require('fs');
const chalk = require('chalk');
let status = 'ready';
emitter.on('error', err => {
  console.log(chalk.red(err.message));
});
const selected = callback => {
  emitter.once('selected', callback);
  if (status === 'ready') {
    status = 'pending';
    fs.readFile('../input.txt', 'utf-8', (err, data) => {
      if (err) {
        return emitter.emit('error', err);
      }
      emitter.emit('selected', data);
      status = 'ready';
    });
  }
};

selected(function(data) {
  console.log(data);
});
selected(function(data) {
  console.log(data);
});
selected(function(data) {
  console.log(data);
});
selected(function(data) {
  console.log(data);
});
