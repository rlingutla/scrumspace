var gulp = require('gulp'),
	sass = require('gulp-sass');

gulp.task('scss', function() {
  return gulp.src('build/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('watch', function() {
  	gulp.watch('build/sass/**/*', ['scss']);
});

gulp.task('default', ['scss', 'watch'], function() {});
