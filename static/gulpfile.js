'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var run = require('run-sequence');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat'); // склейка файлов
var uglify = require('gulp-uglify'); // минификация js
 
gulp.task('sass', function () {
  gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./img/**/*', ['images']);
});

gulp.task('autoprefixer', function () {
    return gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/build/'));
});

gulp.task('default', function () {
   return gulp.src('css/build/style.css')
       .pipe(csso())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('css/build'))
});

gulp.task('development', function () {
   return gulp.src('css/build/style.css')
       .pipe(csso({
           restructure: false,
           sourceMap: true,
           debug: true
       }))
       .pipe(gulp.dest('css/build'))
});

gulp.task('compress', function () {
   gulp.src('img/*')
       .pipe(imagemin())
       //.pipe(gulp.dest('css/build/images'));
       .pipe(gulp.dest('img/')); //for compress imgs on fly
});

gulp.task('remove', function () {
   return gulp.src('css/build/style.css')
       .pipe(clean({force: true}))
       //.pipe(gulp.dest('css'));
});

gulp.task('js', function () {
   gulp.src('js/*')
       .pipe(concat('min.js')) // склеиваю все js
       // .pipe(uglify()) // минифицирую получившийся код
       .pipe(gulp.dest('js/build/'))
});

gulp.task('build', function (fn) {
   run('sass', 'autoprefixer', 'default', 'development', 'compress', 'remove', 'js', fn);
});