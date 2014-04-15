var gulp = require('gulp');
var Techy = require('techy').gulp({
	root: __dirname,
	theme: 'default'
});

gulp.task('compile', function() {
    gulp.src('./src/**/*.md')
    .pipe(Techy())
    .pipe(gulp.dest('./dest'));
});

gulp.task('watchers', function() {
	gulp.watch(['src/**/*.md'], ['compile']);
});

gulp.task('default', ['compile', 'watchers']);