const npsUtils = require("nps-utils");

const { series, rimraf, concurrent } = npsUtils;

module.exports = {
  scripts: {
    build: {
      description: "clean dist directory and run all builds",
      default: series(
        rimraf("lib"),
        concurrent.nps("build.rollup"),
        rimraf("lib/__tests__")
      ),
      rollup: "NODE_ENV=production rollup -c",
      babel: "babel src -d lib",
      watch: "babel src -d lib -w",
      docs: series(rimraf("docs/dist"), "webpack --progress -p")
    },
    publish: {
      default: series(
        "nps build.docs",
        "gh-pages -d docs/dist",
        rimraf("docs/dist")
      )
    }
  }
};
