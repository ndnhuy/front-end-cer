'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();


gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: './public'
    });

    watch('./public/sass/**/*.scss', function() {
        gulp.start('sass');
    });
    gulp.watch('./public/**/*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});