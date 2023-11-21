import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify-es";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const config = {
  input: "src/index.js",
  output: {
    name: "oeb_visualizations",
    exports: "named",
    globals: {
      vue: "Vue",
      'plotly.js-dist': 'Plotly',
    }
  },
  external: ["vue", "plotly.js-dist"],
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble(),
    uglify()
  ]
};

export default config;