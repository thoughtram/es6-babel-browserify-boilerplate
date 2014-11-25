var gulp = require('gulp');
var connect = require('gulp-connect');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var to5Browserify = require('6to5-browserify');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');

var config = {
  entryFile: './src/app.js',
  outputDir: './dist/',
  outputFile: 'app.js'
};

// clean the output directory
gulp.task('clean', function(cb){
    rimraf(config.outputDir, cb);
});

// TRANSPILE ES6
gulp.task('build', ['clean'], function() {
  browserify({ debug: true })
    .transform(to5Browserify)
    .require(config.entryFile, { entry: true })
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
});

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  var bundler = watchify(browserify(config.entryFile, watchify.args));

  bundler.transform(to5Browserify);

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) { console.log('Error: ' + err.message); })
      .pipe(source(config.outputFile))
      .pipe(gulp.dest(config.outputDir))
  }

  return rebundle();
});

// WEB SERVER
gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8000,
  open: true,
  livereload: false
}));
