const gulp = require("gulp");
const config = require("./gulp-config")();
const env = require("./gulp-env")();
const browserSync = require("browser-sync").create();
const runSequence = require("run-sequence").use(gulp);
const $ = require("gulp-load-plugins")({ lazy: true });

////////////////
// Default Tasks
gulp.task("default", ["help"]);
gulp.task("help", $.taskListing);

///////////////
// Global Jobs
gulp.task("__start-local__", [
  "task:compile-styles",
  "task:compile-scripts",
  "task:compile-html",
  "task:compile-images",
  "task:start-watch"
]);

gulp.task("__compile-assets__", [
  "task:compile-styles",
  "task:compile-scripts",
  "task:move-json",
  "task:compile-html",
  "task:compile-images"
]);

////////////////
// Local Tasks
gulp.task("task:compile-styles", () => {
  return gulp
    .src(config.styles.source)
    .pipe(errorHandler())
    .pipe($.sourcemaps.init())
    .pipe($.sass(config.options.sass))
    .pipe($.autoprefixer(config.autoPrefixerOptions))
    .pipe($.sourcemaps.write("./"))
    .pipe(gulp.dest(config.styles.build))
    .pipe(browserSync.stream());
});

gulp.task("task:compile-scripts", () => {
  return gulp
    .src(config.scripts.source)
    .pipe(errorHandler())
    .pipe($.changed(config.scripts.build))
    .pipe($.babel(config.options.babelEnvOptions))
    .pipe(gulp.dest(config.scripts.build))
    .pipe(browserSync.stream());
});

gulp.task("task:compile-html", () => {
  return gulp
    .src(config.html.source)
    .pipe($.changed(config.html.build))
    .pipe(
      $.fileInclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(config.html.build));
});

gulp.task("task:compile-images", () => {
  return gulp
    .src(config.images.source)
    .pipe($.changed(config.images.build))
    .pipe(gulp.dest(config.images.build));
});

gulp.task("task:start-watch", ["task:start-server"], () => {
  gulp.watch(config.styles.source, () => {
    runSequence("task:compile-styles");
  });

  gulp.watch(config.html.source, () => {
    runSequence("task:compile-html", "task:page-reload");
  });

  gulp.watch(config.scripts.source, () => {
    runSequence("task:compile-scripts", "task:page-reload");
  });

  gulp.watch(config.images.source, () => {
    runSequence("task:compile-images", "task:page-reload");
  });
});

gulp.task("task:start-server", () => {
  if (env.devURL == "./") {
    config.browserSync["server"] = {
      baseDir: `${env.buildPath}/`
    };
  } else {
    config.browserSync["proxy"] = env.devURL;
  }
  browserSync.init(null, config.browserSync);
});

gulp.task("task:page-reload", () => {
  browserSync.reload();
});

///////////////////////////
// Functions
///////////////////////////
function errorHandler() {
  return $.plumber({
    errorHandler: function(err) {
      $.notify.onError({
        title: `Error : ${err.plugin}`,
        message: `Issue : ${err}`,
        sound: false
      })(err);

      console.log(`

/////////////////////////////////////
/////////////////////////////////////
Error: ${err.plugin}
Issue : ${err}
/////////////////////////////////////
/////////////////////////////////////

`);
      this.emit("end");
    }
  });
}
