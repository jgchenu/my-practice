const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const util = require('util');

const PromiseA = function() {
  EventEmitter.call(this);
};
util.inherits(PromiseA, EventEmitter);

PromiseA.prototype.then = function(onResolve, onReject, onProgress) {
  if (typeof onResolve === 'function') {
    this.once('success', onResolve);
  }
  if (typeof onReject === 'function') {
    this.once('error', onReject);
  }
  if (typeof onProgress === 'function') {
    this.on('progress', onProgress);
  }
  return this;
};

const Deferred = function() {
  this.state = 'unfilled';
  this.promise = new PromiseA();
};

Deferred.prototype.resolve = function(data) {
  this.state = 'filled';
  this.promise.emit('success', data);
};

Deferred.prototype.reject = function(err) {
  this.state = 'failed';
  this.promise.emit('error', err);
};

Deferred.prototype.progress = function(chunk) {
  this.promise.emit('progress', chunk);
};

Deferred.prototype.makeNodeResolve = function() {
  const that = this;
  return function(err, ...rets) {
    if (err) {
      return that.reject(err);
    }
    that.resolve.apply(that, rets);
  };
};

const promisify = function(res) {
  var deferred = new Deferred();
  var result = '';
  res.on('data', function(chunk) {
    result += chunk;
    deferred.progress(chunk);
  });
  res.on('end', function() {
    deferred.resolve(result);
  });
  res.on('error', function(err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

/**
promisify(res).then(
  function(data) {
    // Done
  },
  function(err) {
    // Error
  },
  function(chunk) {
    // progress
    console.log('BODY: ' + chunk);
  }
);
*/

const readFile = function(file) {
  const deferred = new Deferred();
  fs.readFile(file, 'utf-8', deferred.makeNodeResolve());
  return deferred.promise;
};

readFile('./input.txt').then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err.message);
  }
);
