/* eslint-disable no-console */

const fs = require('fs');
const chalk = require('chalk');
const glob = require('globby');
const sass = require('node-sass');
const importer = require('node-sass-importer');

const shouldWatchFiles = process.argv[2] === '--watch';

// getExtension('foo.bar.css')
// => 'css'
function getExtension(fileName) {
  return fileName.split('.').pop();
}

// removeExtension('foo.bar.css')
// => 'foo.bar'
function removeExtension(fileName) {
  const split = fileName.split('.');
  split.pop();
  return split.join('.');
}


function writeCss() {
  const importerOptions = {
    roots: [ 'styles', 'components' ],
  };

  glob([ 'components/**/*.scss', 'styles/core.scss', 'styles/quartz-react.scss' ]).then((paths) => {
    paths.forEach((file) => {
      const fileName = file.split('/').pop();
      const cssFileName = `${removeExtension(fileName)}.css`;
      sass.render({ file, importer, importerOptions }, (err, result) => {
        if (err) {
          console.log(chalk.yellow('\nFailed to compile: ', fileName, '\n'));
          console.error(err);
          return;
        }
        fs.writeFileSync(`demo/public/css/${cssFileName}`, result.css);
        fs.writeFileSync(`dist/css/${cssFileName}`, result.css);
      });
    });
  });
}

function recompile(eventType, fileName) {
  const extensionsToWatch = [ 'scss', 'sass', 'css' ];
  if (extensionsToWatch.includes(getExtension(fileName))) {
    console.log(chalk.blue(`${fileName} changed. Compiling css`));
    writeCss();
  }
}

function watchForChanges() {
  console.log(chalk.blue('Watching components/** and styles/** for changes'));
  fs.watch('components/', { recursive: true }, recompile);
  fs.watch('styles/', { recursive: true }, recompile);
}


function main() {
  if (shouldWatchFiles) watchForChanges();
  writeCss();
}

main();
