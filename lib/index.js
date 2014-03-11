#!/usr/bin/env node

var root = process.cwd();
var rootTechy = __dirname;

var gulp = require('gulp');
var absurd = require('gulp-absurd');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pages = require(__dirname + "/tasks/pages");

var Techy = function() {
	return {
		compilePages: function() {
			gulp.src(root + '/**/*.md').pipe(pages(root));
			return this;
		},
		compilePage: function(src) {
			gulp.src(src).pipe(pages(root));
			return this;
		},
		watchFiles: function() {
			gulp.watch([root + '/**/*.md'], function(event) {
				this.compilePage(event.path);
			}.bind(this));
		}
	}
}

Techy().compilePages().watchFiles();



// gulp.task('js', function() {
// 	gulp.src('./src/js/**/*.js')
// 	// .pipe(uglify())
// 	.pipe(concat('scripts.js'))
// 	// .pipe(jshint())
// 	// .pipe(jshint.reporter('default'))
// 	.pipe(gulp.dest('./public/'))
// });

// gulp.task('css', function() {
// 	gulp.src('./src/css/styles.js')
//     .pipe(absurd({
//         minify: false,
//         combineSelectors: false
//     }))
//     .pipe(gulp.dest('./public'));
// });

// gulp.task('watchers', function() {
// 	gulp.watch(['pages/**/*.md', 'layout.html', 'social.html', 'pages/structure.json'], ['pages']);
// 	gulp.watch('src/js/**/*.js', ['js']);
// 	gulp.watch('src/css/**/*.*', ['css']);
// });

// gulp.task('default', ['pages', 'builds', 'js', 'css', 'watchers']);