var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  webpack = require('gulp-webpack'),
  livereload = require('gulp-livereload');


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
  return gulp.src('src/client/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload());
});

// copy static files
gulp.task('copy_static', function(){
  return gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*', ['run-build']);
});

gulp.task('default', ['run-build'], function() {});
gulp.task('build', ['default'], function() {});
gulp.task('dev', ['run-build', 'watch'], function() {});
