var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 15 versions', '> 1%', 'ie 10', 'ie 9','ie 8','ie 7'] });
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');

/* Task to compile less */
gulp.task('compile-less', function() {
    gulp.src(['./less/matches.less','./less/app_promo.less','./less/content_homepage.less','./less/aside_right.less','./less/socials_horisontal.less','./less/team.less','./less/sports-news.less', './less/tournament.less', './less/cup.less', './less/player.less', './less/article.less','./less/favorites.less'])
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./css/'));
});

/*Minify css*/
gulp.task('css-libs', ['compile-less'], function() {
    return gulp.src('./css/*.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('./css/')); // Выгружаем в папку app/css
});

gulp.task('clear', function () {
    return cache.clearAll();
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
    gulp.watch(['./less/matches.less','./less/app_promo.less','./less/content_homepage.less','./less/aside_right.less','./less/socials_horisontal.less', './less/team.less', './less/tournament.less', './less/cup.less', './less/player.less','./less/sports-news.less', './less/article.less','./less/favorites.less'] , ['compile-less']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);