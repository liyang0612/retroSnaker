//贪吃蛇开发环境配置
var gulp = require('gulp'),
    mincss = require('gulp-minify-css'),
    minjs=require('gulp-jshint'),//js错误解析
    browserSync=require('browser-sync').create();

gulp.task('css',function () {
    gulp.src('src/css/*')
        .pipe(mincss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
})

gulp.task('js',function () {
    gulp.src('src/js/*')
        .pipe(minjs())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
})

gulp.task('server',function () {
    browserSync.init({
        'server':'dist'
    });
    gulp.watch('src/css/*',['css']);
    gulp.watch('src/js/*',['js'])
    gulp.watch('dist/*.html').on('change',browserSync.reload)
})

gulp.task('default',['server'])
