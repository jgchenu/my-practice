const events = require('events');
const util = require('util');
function Stream() {
  events.EventEmitter.call(this);
}
util.inherits(Stream, events.EventEmitter);
console.log(Stream.prototype)
console.log(Stream.prototype.__proto__);