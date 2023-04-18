const path = require('path');

module.exports = {
  process(sourceText, filePath) {
    const isSvg = path.extname(filePath) === '.svg';
    if (!isSvg) {
      return {
        code: sourceText,
      };
    }

    const name = `svg-${path.basename(filePath, '.svg')}`
      .split(/\W+/)
      .map((x) => `${x.charAt(0).toUpperCase()}${x.slice(1)}`)
      .join('');

    return {
      code: `
      const React = require('react');
      function ${name}(props) {
        return React.createElement(
          'svg',
          Object.assign({}, props, {'data-file-name': ${name}.name})
        );
      }
      module.exports = ${name};
                  `,
    };
  },
};
