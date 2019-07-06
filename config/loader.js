
const loaderUtils = require('loader-utils');

module.exports = function loader(source) {
  const options = loaderUtils.getOptions(this);
  const files = options.files;
  const newLines = source.split('\n').map(line => {
    if (line.includes('import')) {
      let changedLine = line;
      files.some(f => {
        if(changedLine.includes(f)) {
          changedLine = line.replace(new RegExp(`(import.*from ').*${f}(.*)`), `$1../flavor/${f}$2`);
          console.log('[[ linlnlnnl ]]\n', line, '\n', changedLine);
          return true;
        }
        return false;
      });
      return changedLine;
    }
    return line;
  });
  return newLines.join('\n');
}