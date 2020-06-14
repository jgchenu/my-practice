const EventEmitter = require('events').EventEmitter;
const channel = new EventEmitter();
channel.on('join', function() {
  console.log('welcome');
});
channel.emit('join');