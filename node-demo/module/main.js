var counter1 = require("./util/counter");
var counter2 = require("./util/counter");
var counter3 = require("./util/counter3");

/**
 * 一个模块中的 JS 代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。
 */
console.log(counter1.count());
console.log(counter2.count());
console.log(counter3.count());


/**
 * 分为两种：
 * 
 * 
 * 第一种为：以./ 开头的模块引用，例如：const jgchen = require('./jgchen');
 * 
 * 首先会查找./jgchen 目录下的package.json 文件，寻找main属性对应的路径有无存在该模块，有的话返回该模块
 * 如果没有的话，会查找./jgchen.js 文件 ，如果有则返回该模块
 * 如果没有的话，会查找./jgchen 目录下的index.js文件，如果有则返回该模块
 * 前面上面都找不到的话，就会抛出错误，找不到该模块。
 * 
 * 第二种: 以不带./ 的 模块引用，例如：const jgchen  = require('jgchen');
 * 
 * 1.首先开始在同目录下查找，判断是否是node本身自带的核心内置模块，是的话则返回
 * 2.如果不是的话，在当前目录下的node_modules目录下，package.json寻找main属性对应的路径有无存在该模块，有的话返回该模块
 * 3.如果没有，那么会查找./node_modules/jgchen 目录下的index.js文件，如果有则返回该模块
 * 上面的方式找不到，会尝试进入父目录，重复2，3 步骤，如果还是找不到，那么会进入更上一级目录，直至找到模块返回 或者 到根目录找不到为止
 * 如果还是没找到，那么确定模块是否在环境变量NODE_PATH指定的目录下，如果有则返回
 * 上面的方式都还没找到，那么会抛出错误，找不到该模块。
 */


 /**
  * 关于模块的导出：
  * 最终在程序里导出的是module.exports。
  * exports只是对module.exports的一个全局引用，最初被定义为一个可以添加属性的空对象。
  * 所以exports.myFunc只是 module.exports.myFunc的简写
  * 
  * 所以，如果把exports设定为别的，就打破了module.exports和exports之间的 引用关系。
  * 可是因为真正导出的是module.exports，那样exports就不能用了，因为 它不再指向module.exports了。
  * 如果你想维持那个链接，可以像下面这样让 module.exports再次引用exports: module.exports = exports = Currency;
  */
