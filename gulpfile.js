const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('default', ['serve']);

gulp.task('serve', () => {});

gulp.task('test', () => {
  gulp.src('test/**/*-test.js')
    .pipe(jasmine({ errorOnFail: false }));
});
