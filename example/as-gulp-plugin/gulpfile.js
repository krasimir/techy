var gulp = require('gulp');
var Techy = require(__dirname + '/../../lib/index.js').gulp({
	root: __dirname, // required
	customVar: 'friend'
});

gulp.task('default', function() {
    gulp.src('./src/**/*.md')
    .pipe(Techy)
    .pipe(gulp.dest('./dest'));
});