import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const input = './src/index.ts';
const plugins = [
  resolve(),
  commonjs(),
  json(),
  typescript({
    tsconfig: './tsconfig.build.json',
  }),
];

export default [
  {
    input,
    external: ['tslib'],
    output: [
      {
        format: 'cjs',
        file: 'dist/lcn.cjs.js',
      },
      {
        format: 'es',
        file: 'dist/lcn.esm.js',
      },
    ],
    plugins,
  },
  {
    input,
    output: [
      {
        format: 'umd',
        file: 'dist/lcn.js',
        name: 'lcn',
        sourcemap: true,
      },
      {
        format: 'umd',
        file: 'dist/lcn.min.js',
        name: 'lcn',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins,
  },
];
