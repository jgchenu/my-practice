const EventEmitter = require('events').EventEmitter;
const chalk = require('chalk');
const util = require('util');
const fs = require('fs');

function PromiseA() {
  // 拷贝属性
  EventEmitter.call(this);
}
// 继承原型
util.inherits(PromiseA, EventEmitter);

PromiseA.prototype.then = function(onResolve, onReject, onProgress) {
  if (typeof onResolve === 'function') {
    this.once('resolved', onResolve);
  }
  if (typeof onReject === 'function') {
    this.once('rejected', onReject);
  }
  if (typeof onProgress === 'function') {
    this.once('progress', onProgress);
  }
  return this;
};

function Deferred() {
  this.state = 'pending';
  this.promise = new PromiseA();
}

Deferred.prototype.resolve = function(data) {
  if (this.state === 'pending') {
    this.state = 'resolved';
    this.promise.emit('resolved', data);
  }
};

Deferred.prototype.reject = function(err) {
  if (this.state === 'pending') {
    this.state = 'rejected';
    this.promise.emit('rejected', err);
  }
};

Deferred.prototype.progress = function(chunk) {
  this.promise.emit('progress', chunk);
};

Deferred.prototype.all = function(promises) {
  let count = promises.length;
  const results = [];
  const that = this;
  promises.forEach((promise, index) => {
    promise.then(
      function(data) {
        results[index] = data;
        count--;
        if (count === 0) {
          that.resolve(results);
        }
      },
      function(err) {
        that.reject(err);
      }
    );
  });
  return this.promise;
};

Deferred.prototype.makeNodeResolve = function() {
  const that = this;
  return function(err, data) {
    if (err) {
      return that.reject(err);
    }
    that.resolve(data);
  };
};

function readFile(file, encoding) {
  const deferred = new Deferred();
  fs.readFile(file, encoding, deferred.makeNodeResolve());
  return deferred.promise;
}

const promise1 = readFile('./input.txt', 'utf-8');
const promise2 = readFile('./output.txt', 'utf-8');
const deferred = new Deferred();
deferred.all([promise1, promise2]).then(
  function(results) {
    console.log(results);
  },
  function(err) {
    console.log(chalk.red(err.message));
  }
);
