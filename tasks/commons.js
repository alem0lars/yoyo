const path = require("path");
const fs = require("fs");

const browserSync = require("browser-sync").create();

const commons = {};

commons.isProd = process.env.NODE_ENV === "production";

commons.rootDir = path.dirname(__dirname);
commons.srcDir = path.join(commons.rootDir, "src");
commons.srcViewsDir = path.join(commons.srcDir, "views");
commons.srcStylesDir = path.join(commons.srcDir, "styles");
commons.srcAssetsDir = path.join(commons.srcDir, "assets");
commons.srcDataDir = path.join(commons.srcDir, "data");
commons.nodemodulesDir = path.join(commons.rootDir, "node_modules");
commons.buildDir = path.join(commons.rootDir, "build");
commons.buildStylesDir = path.join(commons.buildDir, "styles");
commons.buildAssetsDir = path.join(commons.buildDir, "assets");

commons.locals = Object.fromEntries(
  fs
    .readdirSync(commons.srcDataDir)
    .filter((fileName) => path.parse(fileName).ext === ".js")
    .map((fileName) => [
      path.parse(fileName).name,
      require(path.join(commons.srcDataDir, fileName)),
    ])
);

commons.browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

module.exports = commons;
