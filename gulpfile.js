var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 15 versions', '> 1%', 'ie 10', 'ie 9','ie 8','ie 7'] });

/* Task to compile less */
gulp.task('compile-less', function() {
    gulp.src(['./less/team.less', './less/tournament.less', './less/cup.less', './less/player.less'])
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./css/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
    gulp.watch(['./less/team.less', './less/tournament.less', './less/cup.less', './less/player.less'] , ['compile-less']);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less']);