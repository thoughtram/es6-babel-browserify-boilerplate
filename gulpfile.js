var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var to5 = require('gulp-6to5');

var rimraf = require('rimraf');

var path = {
  src: './src/**/*.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf('compiled', cb);
});

// TRANSPILE ES6
gulp.task('build', ['clean'], function() {
  gulp.src(path.src)
      .pipe(to5())
      .pipe(gulp.dest('compiled/src'))
      .pipe(browserify())
      .pipe(filter('app.js'))
      .pipe(gulp.dest('compiled/combined'));
});

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(path.src, ['build']);
});

// WEB SERVER
gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8000,
  open: true,
  livereload: false
}));
