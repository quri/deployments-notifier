import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);

export default {
  entry: "lib/index.js",
  plugins: [babel(babelrc())],
  external,
  targets: [
    {
      dest: pkg.main,
      format: "umd",
      moduleName: "deploymentsNotifier",
      sourceMap: true,
    },
    {
      dest: pkg["jsnext:main"],
      format: "es",
      sourceMap: true,
    },
  ],
};

