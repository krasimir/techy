var gulp = require('gulp');
var Techy = require(__dirname + '/../../lib/index.js').gulp({	
	customVar: 'friend'
});

gulp.task('compile', function() {
    gulp.src('./src/**/*.*')
    .pipe(Techy())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watchers', function() {
	gulp.watch(['src/**/*.*', 'themes/default/css/**/*.js'], ['compile']);
});

gulp.task('default', ['compile', 'watchers']);

