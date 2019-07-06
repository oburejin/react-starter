const fs = require('fs');
const loaderUtils = require('loader-utils');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file))
    if (stat.isDirectory()) fileList = walk(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList;
}
module.exports = function loader(source) {
  const options = loaderUtils.getOptions(this);
  const dir = options.dir.replace('./','');
  const files = walk(options.dir).map(f=>f.replace(`${dir}/`, ''));
  const newLines = source.split('\n').map(line => {
    if (line.includes('import')) {
      let changedLine = line;
      files.some(f => {
        if(changedLine.includes(f)) {
          changedLine = line.replace(new RegExp(`(import.*from ').*${f}(.*)`), `$1../${dir}/${f}$2`);
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