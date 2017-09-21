const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['serve']);

gulp.task('serve', () => {
  const stream = nodemon({
    script: 'server.js',
    ext: 'html js'
  });

  stream
    .on('restart', () => {
      console.log('server restarted');
    })
    .on('crash', () => {
      console.error('app crashed, restarting in 10 seconds\n');
      stream.emit('restart', 10);
    });
});

gulp.task('test', () => {
  gulp.src('test/**/*-test.js')
    .pipe(jasmine({ errorOnFail: false }));
});
