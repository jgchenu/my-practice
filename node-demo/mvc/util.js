exports.pathRegexp = function(path) {
  var keys = [];
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '(?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(
      _,
      slash,
      format,
      key,
      capture,
      optional,
      star
    ) {
      // 将匹配到的键值存起来
      keys.push(key);
      slash = slash || '';
      return (
        '' +
        (optional ? '' : slash) +
        '(?:' +
        (optional ? slash : '') +
        (format || '') +
        (capture || ((format && '([^/.]+?)') || '([^/]+?)')) +
        ')' +
        (optional || '') +
        (star ? '(/*)?' : '')
      );
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
  return {
    keys: keys,
    regexp: new RegExp('^' + path + '$')
  };
};
