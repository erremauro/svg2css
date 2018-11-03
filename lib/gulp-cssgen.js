const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');
const File = gutil.File;
const PluginError = gutil.PluginError;

module.exports = gulpCssGen;

/////////////////////////

function gulpCssGen(filename) {
  if (!filename) {
    throw new PluginError(
      'gulp-cssgen',
      'Missing filename option for gulp-cssgen'
    );
  }

  let latestFile;
  const cssStream = through();

  return through.obj(bufferContents, endStream);

  /////////////////////////////////////////////////

  function bufferContents(file, enc, cb) {
    latestFile = file;
    const name = path.parse(file.path).name;
    const data = file.contents.toString();
    appendCssSyntax(name, data);
    cb();
  }

  function endStream(cb) {
    if (!latestFile) {
      cb();
    }

    cssStream.end();
    const endFile = new File(filename);
    endFile.path = path.join(latestFile.base, filename);
    endFile.contents = cssStream;
    this.push(endFile);
    cb();
  }

  function appendCssSyntax(name, svgdata) {
    const className = `.${name}-svg`;
    const dataImage = `data:image/svg+xml,${svgdata}`;
    const content = `${className} {background-image: url('${dataImage}');}\n`;
    cssStream.write(content);
  }
}
