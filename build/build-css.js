const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const version = require('../package.json').version;

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const rootDir = path.resolve(__dirname, '..');
const cssDir = path.resolve(rootDir, 'demo/public/css');

async function main() {
  const cssFiles = await readdir(cssDir);
  const cssReadPromises = cssFiles.map(file => readFile(path.resolve(cssDir, file), 'utf8'));
  const cssContents = await Promise.all(cssReadPromises);
  const cssContentsWithComment = cssContents.map((css) => {
    const hash = crypto.createHash('md5');
    hash.setEncoding('hex');
    hash.write(css);
    hash.end();
    const comment = `/*
  Quartz-react version: ${version}
  Current file hash: ${hash.read()}
*/

`;
    return comment.concat(css);
  });

  const cssWritePromises = cssFiles.map((file, i) => writeFile(path.resolve(rootDir, 'dist', file), cssContentsWithComment[i]));
  await Promise.all(cssWritePromises);
  console.log('CSS build success');
}

main();
