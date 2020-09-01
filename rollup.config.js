import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import { autoPreprocess } from "svelte-preprocess/dist/autoProcess";
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;
const API = process.env.API || "/api";

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    json(),
    replace({
      process: JSON.stringify({
        env: {
          isProd: production,
          SVELTE_APP_API: "http://localhost:10627/api",
        },
      }),
    }),
    svelte({
      dev: !production,
      preprocess: autoPreprocess(),
      css: (css) => {
        css.write("public/build/bundle.css");
      },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    !production && serve(),
    !production && livereload("public"),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
