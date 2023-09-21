import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export const input = "./src/index.ts";
export const plugins = [
  resolve(),
  commonjs(),
  json(),
  typescript({
    tsconfig: "./tsconfig.build.json",
  }),
];
