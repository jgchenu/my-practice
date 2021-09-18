var util = require("util");
/**
 * util.inherits
 */
function Base() {
  this.name = "base";
  this.base = 1991;
  this.sayHello = function() {
    console.log("Hello " + this.name);
  };
}
Base.prototype.showName = function() {
  console.log(this.name);
};
function Sub() {
  this.name = "sub";
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
/**
 * Sub 仅仅继承了Base 在原型中定义的函数，
 * 而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
 * 同时，在原型中定义的属性不会被 console.log 作为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到报错没有这个方法
 */
//objSub.sayHello();
console.log(objSub);

/**
 * util.inspect(object,[showHidden],[depth],[colors]) 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。
 * 它至少接受一个参数 object，即要转换的对象。
 * showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
 * depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。
 * 如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
 * 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
 * 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了 toString 方法也不会调
 */
function Person() {
  this.name = "byvoid";
  this.toString = function() {
    return this.name;
  };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));

/**
 * util.isArray(object)
 */
util.isArray([]);
// true
util.isArray(new Array());
// true
util.isArray({});
// false

/**
 * util.isRegExp(object)
 */

util.isRegExp(/some regexp/);
// true
util.isRegExp(new RegExp("another regexp"));
// true
util.isRegExp({});
// false

/**
 * util.isDate(object)
 * 如果给定的参数 "object" 是一个日期返回true，否则返回false。
 */
util.isDate(new Date());
// true
util.isDate(Date());
// false (without 'new' returns a String)
util.isDate({});
// false

/**
 * util.isError(object)
 * 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
 */
util.isError(new Error());
// true
util.isError(new TypeError());
// true
util.isError({ name: "Error", message: "an error occurred" });
// false
