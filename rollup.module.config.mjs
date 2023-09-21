import { input, plugins } from './rollup.base.config.mjs';

export default {
  input,
  external: ["tslib"],
  output: [
    {
      format: "cjs",
      file: "dist/index.cjs.js",
    },
    {
      format: "es",
      file: "dist/index.esm.js",
    },
  ],
  plugins
};
