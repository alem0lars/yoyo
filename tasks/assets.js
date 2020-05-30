const path = require("path");

const gulp = require("gulp");

const { srcAssetsDir, buildAssetsDir } = require("./commons");

function buildAssets() {
  return gulp
    .src(path.join(srcAssetsDir, "**"))
    .pipe(gulp.dest(buildAssetsDir));
}

function watchAssets() {
  return gulp.watch(path.join(srcAssetsDir, "**"), gulp.series(buildAssets));
}

module.exports.buildAssets = buildAssets;
module.exports.watchAssets = watchAssets;
