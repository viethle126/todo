var gulp = require('gulp');
var mocha = require('gulp-mocha');
var casperJS = require('gulp-casperjs');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

var app = require('./app.js');
var server = '';

gulp.task('start', function() {
  server = app.listen(1337);
})

gulp.task('lint', ['start'], function() {
  return gulp.src(['app.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('mocha', ['lint'], function () {
  return gulp.src('app.spec.js')
  .pipe(mocha())
})

gulp.task('casper', ['mocha'], function() {
  return gulp.src('casper.js')
  .pipe(casperJS())
})

gulp.task('test', ['casper'], function() {
  server.close();
})

gulp.task('default', ['casper'], function() {
  server.close();
  nodemon({ script: 'app.js' })
})
