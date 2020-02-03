import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify-es";
import minify from "rollup-plugin-babel-minify";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

const NODE_ENV = process.env.NODE_ENV || "development";

const { name } = pkg;
const [path, ext] = pkg.main.split(".");

export default [
  {
    input: "./src/export.js",
    output: {
      name,
      file: `${path}.js`,
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      replace({
        exclude: "node_modules/**",
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      }),
      postcss({
        extract: true,
        plugins: [],
        extensions: [".css"]
      }),
      babel({
        include: "src/**/*.js",
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      resolve({
        module: true,
        main: true
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          "node_modules/react/index.js": [
            "Children",
            "Component",
            "PropTypes",
            "Fragment"
          ],
          "node_modules/react-dom/index.js": ["render"]
        }
      })
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {})
    ],
    globals: {
      "styled-components": "styled",
      "react-dom": "ReactDOM",
      react: "React"
    }
  },
  {
    input: "./src/export.js",
    output: {
      name,
      file: `${path}.min.js`,
      format: "cjs"
    },
    plugins: [
      replace({
        exclude: "node_modules/**",
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      }),
      postcss({
        extract: true,
        plugins: [],
        extensions: [".css"]
      }),
      babel({
        include: "src/**/*.js",
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      resolve({
        module: true,
        main: true
      }),
      commonjs({
        include: "node_modules/**",
        namedExports: {
          "node_modules/react/index.js": [
            "Children",
            "Component",
            "PropTypes",
            "Fragment"
          ],
          "node_modules/react-dom/index.js": ["render"]
        }
      }),
      uglify(),
      minify()
    ],
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {})
    ],
    globals: {
      "react-dom": "ReactDOM",
      react: "React"
    }
  }
];
