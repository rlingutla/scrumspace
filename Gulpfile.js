var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  del = require('del'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  webpack = require('gulp-webpack');


gulp.task('runBuild', function(callback) {
  runSequence(
    'clean',
    [ 'js', 'copy_static', 'scss', 'vendorToDist'],
    callback
  );
});

/* Copy bootstrap files to dist*/
gulp.task('vendorToDist', function () {
  gulp.src(['node_modules/bootstrap/dist/bootstrap-3.3.6-dist 2/css/*'])
      .pipe(gulp.dest('dist/css/'));
  gulp.src(['node_modules/bootstrap/dist/bootstrap-3.3.6-dist 2/js/*'])
      .pipe(gulp.dest('dist/js/'));
  gulp.src(['node_modules/bootstrap/dist/bootstrap-3.3.6-dist 2/fonts/*'])
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
  return gulp.src('app/index.jsx')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/js/'));
});

//copy static files
gulp.task('copy_static', function(){
  return gulp.src(['src/index.html', 'src/static/**/*'], {
      base: 'src'
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['runBuild']);
});

gulp.task('default', ['runBuild'], function() {});
gulp.task('build', ['default'], function() {});
gulp.task('dev', ['runBuild', 'watch'], function() {});
