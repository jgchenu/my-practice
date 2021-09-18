/**
 * 该模块内部定义了一个私有变量 i，并在 exports 对象导出了一个公有方法 count。
 */

var i = 0;
function count() {
  return ++i;
}
exports.count = count;
