'use strict';

var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var conf = require('./gulp/conf');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var angularFileSort = require('gulp-angular-filesort');

gulp.task('clean', done => {
    return del('.build');
    done();
});

gulp.task('styles', done => {require('./gulp/styles')(gulp, less, conf, path, inject); done();});

gulp.task('copy-scripts', gulp.series('styles', done => {require('./gulp/copy-scripts')(gulp, conf, path); done();}));

gulp.task('inject', gulp.series('copy-scripts', done => {require('./gulp/inject')(gulp, conf, path, inject); done();}));

gulp.task('nodemon', done => {require('./gulp/nodemon')(gulp, browserSync); done();});

gulp.task('serve', gulp.series('inject', 'nodemon', done => {require('./gulp/serve')(gulp, conf, browserSync); done();}));

gulp.task('default', gulp.series('serve',done => {
    gulp.watch('src/**/*.js', ['inject']);
    gulp.watch('src/**/*.html', ['inject']);
    gulp.watch('build/index.html').on('change', browserSync.reload);
    done();
}));