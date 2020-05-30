const gulp = require("gulp");
const clean = require("gulp-clean");

const { buildDir } = require("./commons");

function cleanBuild() {
  return gulp.src(buildDir, { read: false }).pipe(clean());
}

module.exports.cleanBuild = cleanBuild;
