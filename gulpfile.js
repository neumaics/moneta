const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

gulp.task('default', ['serve']);

gulp.task('serve', ['scripts'], () => {
  const stream = nodemon({
    script: 'server.js',
    ext: 'html js',
    tasks: ['scripts'],
    ignore: ['public']
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

gulp.task('scripts', ['clean'], () => {
  gulp.src('app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public'));

  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./public/'));
});

gulp.task('clean', function () {
  return gulp.src('public', { read: false })
    .pipe(clean());
});
