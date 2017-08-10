const fs = require('fs');
const chalk = require('chalk');
const glob = require('globby');
const sass = require('node-sass');
const importer = require('node-sass-importer');

// removeExtension('foo.bar.css')
// => 'foo.bar'
function removeExtension(fileName) {
  const split = fileName.split('.');
  split.pop();
  return split.join('.');
}

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
