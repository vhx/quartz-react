import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';

const env = JSON.stringify(process.env.NODE_ENV);

export default {
  format: 'iife',
  moduleName: 'QuartzReact',
  external: [ 'react', 'react-dom' ],
  globals: { react: 'React', 'react-dom': 'ReactDOM' },
  plugins: [
    replace({ 'process.env.NODE_ENV': env }),
    resolve(),
    commonjs(),
    buble({ objectAssign: 'Object.assign' }),
    filesize(),
  ],
};
