const gulp = require("gulp");

// == TASKS

const { buildViews, watchViews } = require("./tasks/views");
const { buildStyles, watchStyles } = require("./tasks/styles");
const { buildAssets, watchAssets } = require("./tasks/assets");
const { buildFavicon, watchFavicon } = require("./tasks/favicon");
const { buildStaticFiles, watchStaticFiles } = require("./tasks/staticfiles");
const { cleanBuild } = require("./tasks/clean");

// == EXPORTS

exports["clean"] = gulp.series(cleanBuild);
exports["clean:build"] = cleanBuild;

exports["build"] = gulp.series(
  buildStaticFiles,
  buildViews,
  buildStyles,
  buildAssets,
  buildFavicon
);
exports["build:staticfiles"] = buildStaticFiles;
exports["build:views"] = buildViews;
exports["build:styles"] = buildStyles;
exports["build:assets"] = buildAssets;
exports["build:favicons"] = buildFavicon; // XXX: must be after the build of index.html

exports["watch"] = gulp.parallel(
  watchStaticFiles,
  watchViews,
  watchStyles,
  watchAssets,
  watchFavicon
);
exports["watch:staticfiles"] = watchStaticFiles;
exports["watch:views"] = watchViews;
exports["watch:styles"] = watchStyles;
exports["watch:assets"] = watchAssets;
exports["watch:favicon"] = watchFavicon;
