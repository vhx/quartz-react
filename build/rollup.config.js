import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

const env = JSON.stringify(process.env.NODE_ENV);

export default {
  entry: 'index.js',
  dest: 'dist/quartz-react.js',
  format: 'cjs',
  moduleName: 'QuartzReact',
  external: [ 'react', 'react-dom', 'prop-types', 'classnames' ],
  plugins: [
    replace({ 'process.env.NODE_ENV': env }),
    resolve(),
    commonjs(),
    buble({ objectAssign: 'Object.assign' }),
    filesize(),
    postcss({
      modules: true,
      plugins: [],
    }),
  ],
};
