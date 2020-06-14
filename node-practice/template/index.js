var complie = function(str) {
  var tpl = str.replace(/<%=([\s\S]+?)%>/g, function(match, code) {
    return "' + obj." + code + "+ '";
  });
  tpl = "var tpl = '" + tpl + "'\nreturn tpl;";
  return new Function('obj, escape', tpl);
};

var render = function(complied, data) {
  return complied(data);
};

var tpl = 'Hello <%=username%>.';
var complied = complie(tpl);
// 先缓存编译后的模板
console.log(render(complied, { username: 'Jackson Tian' })); // => Hello Jackson Tian.
