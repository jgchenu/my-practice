const chalk = require('chalk');
const fs = require('fs');

function PromiseA() {
  // 队列用于存储待执行的回调函数
  this.queue = [];
  this.isPromise = true;
}

PromiseA.prototype.then = function(onResolve, onReject) {
  const handler = {};
  if (typeof onResolve === 'function') {
    handler.onResolve = onResolve;
  }
  if (typeof onReject === 'function') {
    handler.onReject = onReject;
  }
  this.queue.push(handler);
  return this;
};

function Deferred() {
  this.promise = new PromiseA();
}

Deferred.prototype.resolve = function(obj) {
  const promise = this.promise;
  let handler;
  while ((handler = promise.queue.shift())) {
    if (handler && typeof handler.onResolve === 'function') {
      const ret = handler.onResolve(obj);
      // 如果返回一个promise，更新该promise的queue为之前执行剩下的queue
      // 如果不返回一个promise，那么一直执行下去，直到遇见promise，或者执行完毕
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        return;
      }
    }
  }
};

Deferred.prototype.reject = function(err) {
  const promise = this.promise;
  let handler;
  while ((handler = promise.queue.shift())) {
    if (handler && typeof handler.onReject === 'function') {
      const ret = handler.onReject(err);
      // 如果返回一个promise，那么会使用这个新的promise，并且更新该promise的queue为当前剩下的queue  
      // 如果不返回一个promise，那么一直执行下去，直到遇见promise，或者执行完毕      
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Deferred.prototype.callback = function() {
  const that = this;
  return function(err, data) {
    if (err) {
      return that.reject(err);
    }
    that.resolve(data);
  };
};

const smooth = function(method) {
  return function() {
    const deferred = new Deferred();
    method.apply(null, [...arguments, deferred.callback()]);
    return deferred.promise;
  };
};

const readFile = smooth(fs.readFile);

readFile('./input.txt', 'utf-8')
  .then(
    function(data) {
      console.log(data);
      return readFile('./output.txt', 'utf-8');
    },
    function(err) {
      console.log(chalk.red(err.message));
    }
  )
  .then(
    function(data) {
      console.log(data);
    },
    function(err) {
      console.log(chalk.red(err.message));
    }
  );