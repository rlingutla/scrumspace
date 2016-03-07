var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  gutil = require("gulp-util"),
  del = require('del'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  webpack = require('gulp-webpack'),
  livereload = require('gulp-livereload')
  webpackConfig = require("./webpack.config.js")
  nodemon = require('nodemon');


gulp.task('run-build', function(callback) {
  runSequence(
    'clean',
    ['copy_static', 'scss', 'vendorToDist'],
    'js',
    callback
  );
});

/* Copy bootstrap files to dist*/
gulp.task('vendorToDist', function () {
  gulp.src(['node_modules/bootstrap/dist/css/*'])
      .pipe(gulp.dest('dist/css/'));
  gulp.src(['node_modules/bootstrap/dist/js/*'])
      .pipe(gulp.dest('dist/js/'));
  gulp.src(['node_modules/bootstrap/dist/fonts/*'])
      .pipe(gulp.dest('dist/fonts/'));
});


gulp.task('clean', function () {
  return del(['dist/**/*']);
});

gulp.task('scss', function() {
  return gulp.src('src/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
  var wpConfig = Object.create(webpackConfig);

  return gulp.src('src/client/entry.js')
    .pipe(webpack(require('./webpack.config.js'), null, function(err, stats){
      gutil.log("[webpack]", stats.toString({ 
        colors: true, hash: false, timings: false, chunks: false, chunkModules: false, modules: false, children: true, version: true, cached: false, cachedAssets: false, reasons: false, source: false, errorDetails: false
      }));

      if(stats.compilation.errors.length > 0) {
        process.exit(1);
      }
    }))
    .pipe(gulp.dest('dist/js/'));
    // .pipe(livereload());
});

// copy static files
gulp.task('copy_static', function(){
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*', ['run-build']);

  livereload.listen()

    nodemon({
      script: 'src/server/server.js',
      watch: 'src',
      stdout: false
    }).on('readable', function() {
      this.stdout.on('data', function(chunk) {
        if (/^Listening/.test(chunk)) {
          livereload.reload()
        }
        process.stdout.write(chunk)
      })
    })
});

gulp.task('default', ['run-build'], function() {});
gulp.task('build', ['default'], function() {});
gulp.task('dev', ['run-build', 'watch'], function() {});
