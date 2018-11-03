const path = require('path');
const gulp = require('gulp');
const gutil = require('gulp-util');
const svgmin = require('gulp-svgmin');
const cssgen = require('./lib/gulp-cssgen');

const args = process.argv.slice(2);
let svgPath;

if (args.length < 2) {
  printHelp();
  process.exit(0);
}

if (args[0] === '--svg' || args[0] === '-s') {
  svgPath = args[1];
} else {
  printHelp();
  process.exit(0);
}

if (path.extname(svgPath) !== '.svg') {
  console.error(`${svgPath} is not a valid svg file.\n`);
  process.exit(0);
}

const cssFilename = `master-${Date.now()}.css`;

gulp.task(
  'default',
  () => gulp.src(svgPath)
    .pipe(svgmin())
    .pipe(cssgen(cssFilename))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      const outputPath = path.join(path.dirname(svgPath), cssFilename);
      gutil.log(`File generated '${gutil.colors.green(outputPath)}'`);
    })
);

function printHelp() {
  console.log('Usage: gulp --svg <PATH>\n');
  console.log('Example:');
  console.log('  gulp --svg ./path/to/*.svg');
}