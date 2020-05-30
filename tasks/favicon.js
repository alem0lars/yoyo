const path = require("path");
const fs = require("fs");

const favicons = require("favicons");
const through = require("through2");
const { JSDOM } = require("jsdom");
const gulp = require("gulp");

const { srcDir, buildDir, locals, browserSyncReload } = require("./commons");

const srcFaviconFile = path.join(srcDir, "favicon.png");
const buildIndexFile = path.join(buildDir, "index.html");

function buildFavicon() {
  return gulp
    .src(srcFaviconFile)
    .pipe(
      through.obj(function (fav, _, cb) {
        favicons(
          fav.path,
          {
            path: "/", // Path for overriding default icons path. `string`
            appName: locals.company.name, // Your application's name. `string`
            appDescription: locals.company.description, // Your application's description. `string`
            developerName: locals.company.name, // Your (or your developer's) name. `string`
            developerURL: locals.website.url, // Your (or your developer's) URL. `string`
            dir: "auto", // Primary text direction for name, short_name, and description
            lang: locals.website.lang, // Primary language for name and short_name
            background: locals.colorscheme.theme.defaultBackground, // Background colour for flattened icons. `string`
            theme_color: locals.colorscheme.theme.defaultBackground, // Theme color user for example in Android's task switcher. `string`
            appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
            display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
            orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
            scope: "/", // set of URLs that the browser considers within your app
            start_url: "/?homescreen=1", // Start URL when launching the application from a device. `string`
            version: "1.0", // Your application's version string. `string`
            logging: false, // Print logs to console? `boolean`
            pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
            loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
            icons: {
              android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
              yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
            },
          },
          (error, response) => {
            if (error) {
              cb(error, null);
            } else {
              const files = [].concat(response.files).concat(response.images);

              const dom = new JSDOM(
                fs.readFileSync(buildIndexFile, { encoding: "utf-8" })
              );
              for (const element of response.html) {
                dom.window.document.head.appendChild(JSDOM.fragment(element));
              }
              files.push({
                name: path.basename(buildIndexFile),
                contents: dom.serialize(),
              });

              for (const f of files) {
                let dstFile = fav.clone();
                dstFile.path = path.join(path.parse(fav.path).dir, f.name);
                if (f.contents instanceof Buffer) {
                  dstFile.contents = f.contents;
                } else {
                  dstFile.contents = Buffer.from(f.contents);
                }
                this.push(dstFile);
              }

              cb();
            }
          }
        );
      })
    )
    .pipe(gulp.dest(buildDir));
}

function watchFavicon() {
  return gulp.watch(
    srcFaviconFile,
    gulp.series(buildFavicon, browserSyncReload)
  );
}

module.exports.buildFavicon = buildFavicon;
module.exports.watchFavicon = watchFavicon;
