const path = require("path");

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const gulpIf = require("gulp-if");
const cleanCSS = require("gulp-clean-css");

const {
  srcStylesDir,
  nodemodulesDir,
  buildStylesDir,
  isProd,
  browserSyncReload,
} = require("./commons");

function buildStyles() {
  return gulp
    .src(path.join(srcStylesDir, "*.scss"))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: [nodemodulesDir],
        outputStyle: isProd ? "compressed" : "expanded",
      }).on("error", sass.logError)
    )
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpIf(isProd, cleanCSS()))
    .pipe(gulp.dest(buildStylesDir));
}

function watchStyles() {
  return gulp.watch(
    path.join(srcStylesDir, "**", "*.scss"),
    gulp.series(buildStyles, browserSyncReload)
  );
}

module.exports.buildStyles = buildStyles;
module.exports.watchStyles = watchStyles;
