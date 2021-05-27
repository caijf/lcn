import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "dist/index.cjs.js"
    },
    {
      format: "es",
      file: "dist/index.esm.js"
    },
    {
      format: "umd",
      file: "dist/lcn.js",
      name: "lcn"
    },
    {
      format: "umd",
      file: "dist/lcn.min.js",
      name: "lcn",
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.rollup.json"
    })
  ]
}
