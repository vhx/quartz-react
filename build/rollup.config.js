import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';


import postcss from 'rollup-plugin-postcss';
import cssNesting from 'postcss-nested';
import cssImports from 'postcss-import';
import cssVariables from 'postcss-variables';
import autoprefixer from 'autoprefixer';
import cssModules from 'postcss-modules';

const isTestEnv = process.env.NODE_ENV === 'test';
const cssPath = isTestEnv ? 'demo/public/css/quartz.css' : 'dist/quartz.css';
// const sourceMap = isTestEnv ? ';

// The export map is used for css modules.
// It maps easily readable classNames (like .foo)
// to the generated unique/scoped classNames (like .foo_1234a)
const cssExportMap = {};

const cssPlugins = () => postcss({
  sourceMap: true,
  extract: cssPath,
  plugins: [
    cssImports({
      path: [ 'styles' ],
    }),
    cssNesting(),
    cssVariables(),
    autoprefixer(),
    cssModules({
      getJSON(id, token) {
        cssExportMap[id] = token;
      },
    }),
  ],
  getExport: id => cssExportMap[id],
});


export default {
  entry: 'demo/src/index.jsx',
  dest: 'demo/public/js/bundle.js',
  format: 'iife',
  moduleName: 'QuartzReact',
  // external: [ 'react', 'react-dom' ],
  // globals: { react: 'React', 'react-dom': 'ReactDOM' },
  plugins: [
    cssPlugins(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    resolve(),
    commonjs(),
    buble(),
    filesize(),
  ],
};
