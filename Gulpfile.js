var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  webpack = require('gulp-webpack');


gulp.task('run-build', function(callback) {
  runSequence(
    'clean',
    [ 'js', 'copy_static', 'scss', 'vendorToDist'],
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
  return gulp.src('app/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
  return gulp.src('app/client.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'));
});

// copy static files
gulp.task('copy_static', function(){
  return gulp.src(['app/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*', ['run-build']);
});

gulp.task('default', ['run-build'], function() {});
gulp.task('build', ['default'], function() {});
gulp.task('dev', ['run-build', 'watch'], function() {});
