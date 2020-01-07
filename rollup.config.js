import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import autoPreprocess from "svelte-preprocess";
import alias from "@rollup/plugin-alias";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write("public/build/bundle.css");
      },
      preprocess: autoPreprocess(),
    }),
    alias({
      entries: [
        { find: "Comps", replacement: `${__dirname}/src/components` },
        { find: "UI", replacement: `${__dirname}/src/components/UI` },
        { find: "Stores", replacement: `${__dirname}/src/stores` },
        { find: "Data", replacement: `${__dirname}/src/data` },
        { find: "Scripts", replacement: `${__dirname}/src/scripts` },
      ],
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === "svelte" || importee.startsWith("svelte/"),
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
