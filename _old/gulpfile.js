const gulp = require("gulp");
const env = require("./gulp-env")();
const config = require("./gulp-config")();
const $ = require("gulp-load-plugins")({ lazy: true });
const browserSync = require("browser-sync").create();
const del = require("del");

const Tasks = (function() {
  function compileStyles() {
    return gulp
      .src(config.styles.source)
      .pipe(Jobs.error())
      .pipe($.sourcemaps.init())
      .pipe($.sass(config.options.sass))
      .pipe($.autoprefixer(config.options.autoPrefixerOptions))
      .pipe($.sourcemaps.write("./"))
      .pipe(gulp.dest(config.styles.build))
      .pipe(browserSync.stream());
  }

  function compileScripts() {
    return gulp
      .src(config.scripts.source)
      .pipe(Jobs.error())
      .pipe($.changed(config.scripts.build))
      .pipe($.babel())
      .pipe(gulp.dest(config.scripts.build))
      .pipe(browserSync.stream());
  }

  function compileHTML() {
    return gulp
      .src(config.html.source)
      .pipe($.nunjucks.compile())
      .pipe($.htmlBeautify({ indent_size: 2, preserve_newlines: false }))
      .pipe($.rename({ extname: ".html" }))
      .pipe(gulp.dest(config.html.build));
  }

  function compileImages() {
    return gulp
      .src(config.images.source)
      .pipe($.changed(config.images.build))
      .pipe(gulp.dest(config.images.build));
  }

  return {
    compileStyles: compileStyles,
    compileScripts: compileScripts,
    compileHTML: compileHTML,
    compileImages: compileImages
  };
})();

const Server = (function() {
  function reload(next) {
    browserSync.reload();
    next();
  }

  function start(next) {
    if (env.devURL == "./") {
      config.browserSync["server"] = {
        baseDir: `${env.buildPath}/`
      };
    } else {
      config.browserSync["proxy"] = env.devURL;
    }
    browserSync.init(null, config.browserSync);
    next();
  }
  return {
    reload: reload,
    start: start
  };
})();

const Jobs = (function() {
  function clean() {
    return del([env.buildPath]);
  }

  function watch() {
    gulp.watch(config.styles.source, gulp.series(Tasks.compileStyles));
    gulp.watch(config.scripts.source, gulp.series(Tasks.compileScripts, Server.reload));
    gulp.watch(config.html.source, gulp.series(Tasks.compileHTML, Server.reload));
    gulp.watch(config.images.source, gulp.series(Tasks.compileImages, Server.reload));
  }

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

  return {
    clean: clean,
    watch: watch,
    error: errorHandler
  };
})();

gulp.task(
  "__start-local__",
  gulp.series(
    Jobs.clean,
    gulp.parallel(Tasks.compileStyles, Tasks.compileHTML, Tasks.compileScripts, Tasks.compileImages),
    Server.start,
    Jobs.watch
  )
);
