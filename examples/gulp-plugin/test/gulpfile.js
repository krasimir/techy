var gulp = require('gulp');
var Techy = require('techy').gulp({
	root: __dirname,
	theme: 'default'
});

gulp.task('default', function() {
    gulp.src('./src/**/*.md')
    .pipe(Techy)
    .pipe(gulp.dest('./dest'));
});