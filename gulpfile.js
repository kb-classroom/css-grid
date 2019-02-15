var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var pug = require('gulp-pug');

// Change path for the project here
var path = 'app';

gulp.task('pug',function() {
 return gulp.src(path+'/*.jade')
 .pipe(plumber(plumberErrorHandler))
 .pipe(pug({
    doctype: 'html',
    pretty: true
 }))
 .pipe(gulp.dest(path));
});

gulp.task('sass', function() {
  return gulp.src(path+'/sass/**/*.scss')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sass())
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }))
});

var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};


gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch(path+'/sass/**/*.scss', ['sass']);
  gulp.watch(path+'/*.jade', ['pug']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch(path+'/*.html', browserSync.reload); 
  // if you wanna run php
  // gulp.watch('./**/*.php', browserSync.reload); 
  gulp.watch(path+'/js/*.js', browserSync.reload); 
});



gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: path
    },
    // to run on localhost wordpress
    // proxy: "localhost/",
    // notify: false
  })
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})
gulp.task('go', function () {
  runSequence(['sass', 'browserSync', 'watch'],
  )
})