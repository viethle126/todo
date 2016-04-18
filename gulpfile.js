var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

gulp.task('lint', function() {
  return gulp.src(['app.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('mocha', ['lint'], function () {
  gulp.src('app.spec.js')
  .pipe(mocha())
})

gulp.task('default', function() {
  nodemon({ script: 'app.js' })
  .on('start', ['mocha'])
})