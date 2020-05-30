const path = require("path");

const gulp = require("gulp");

const { srcDir, buildDir, browserSyncReload } = require("./commons");

const staticFiles = [path.join(srcDir, "robots.txt")];

function buildStaticFiles() {
  return gulp.src(staticFiles).pipe(gulp.dest(buildDir));
}

function watchStaticFiles() {
  return gulp.watch(
    [path.join(srcDir, "robots.txt")],
    gulp.series(buildStaticFiles, browserSyncReload)
  );
}

module.exports.buildStaticFiles = buildStaticFiles;
module.exports.watchStaticFiles = watchStaticFiles;
