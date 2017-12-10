var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
    console.log('Hello Becky');
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js', function (cb) {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))    
});

gulp.task('useref', function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(''))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    gulp.watch('src/js/**/*.js', ['js']); 
    gulp.watch('*.html', browserSync.reload); 
});

gulp.task('build', function (callback) {
    runSequence('sass', 'js' 
        ['useref'],
        callback
    )
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'js', 'browserSync', 'watch'],
        callback
    )
});