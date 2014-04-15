var gulp = require('gulp');
var Techy = require('techy');

gulp.task('compile', function() {
	console.log('gulpfile.js: compile');
    gulp.src('./src/**/*.md')
    .pipe(Techy.gulp({
		root: __dirname
	}))
    .pipe(gulp.dest('./dest'));
});

gulp.task('watchers', function() {
	gulp.watch(['src/**/*.md'], ['compile']);
});

gulp.task('default', ['compile', 'watchers']);