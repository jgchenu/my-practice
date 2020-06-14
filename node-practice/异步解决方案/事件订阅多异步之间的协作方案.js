const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
const after = (times, callback) => {
  const results = {};
  return function(key, value) {
    results[key] = value;
    times--;
    if (times === 0) {
      callback(results);
    }
  };
};

var done = after(3, render);
emitter.on('done', done);

fs.readFile(template_path, 'utf8', function(err, template) {
  emitter.emit('done', 'template', template);
});
db.query(sql, function(err, data) {
  emitter.emit('done', 'data', data);
});
l10n.get(function(err, resources) {
  emitter.emit('done', 'resources', resources);
});
