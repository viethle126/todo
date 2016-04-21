var gulp = require('gulp');
var mocha = require('gulp-mocha');
var casperJS = require('gulp-casperjs');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src(['app.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('mocha', ['lint'], function () {
  return gulp.src('app.spec.js')
  .pipe(mocha())
})

gulp.task('test', ['mocha'], function() {
  nodemon({ script: 'app.js' })
  return gulp.src('casper.js')
  .pipe(casperJS())
})

gulp.task('default', ['test'])
