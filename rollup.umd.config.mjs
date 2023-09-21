import { input, plugins } from './rollup.base.config.mjs';
import terser from "@rollup/plugin-terser";

export default {
  input,
  output: [
    {
      format: "umd",
      file: "dist/lcn.js",
      name: "lcn",
      sourcemap: true
    },
    {
      format: "umd",
      file: "dist/lcn.min.js",
      name: "lcn",
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  plugins,
};
