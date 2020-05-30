const path = require("path");

const gulp = require("gulp");
const pug = require("gulp-pug");
const data = require("gulp-data");

const {
  srcViewsDir,
  srcDataDir,
  buildDir,
  locals,
  browserSyncReload,
} = require("./commons");

function buildViews() {
  return gulp
    .src(path.join(srcViewsDir, "*.pug"))
    .pipe(data(() => locals))
    .pipe(pug())
    .pipe(gulp.dest(buildDir));
}

function watchViews() {
  return gulp.watch(
    [
      path.join(srcViewsDir, "**", "*.pug"),
      path.join(srcDataDir, "**", "*.js"),
    ],
    gulp.series(buildViews, browserSyncReload)
  );
}

module.exports.buildViews = buildViews;
module.exports.watchViews = watchViews;
