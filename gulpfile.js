const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('hello', function() {
    console.log('Hello Becky');
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']); 
    gulp.watch('src/*.html', browserSync.reload); 
    gulp.watch('src/js/**/*.js', browserSync.reload); 
});

gulp.task('build', function (callback) {
    runSequence('clean:dist', 
        ['sass', 'useref'],
        callback
    )
});

gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});