---
title: Techy / Use Techy as Gulp plugin
---

# Use Techy as Gulp plugin<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Back to the documentation](../../docs)</small>

Techy is based on Gulp and it could be used as a Gulp plugin. All you have to do is to add `techy` module as dependency in your `package.json` file. Here is an example:

	var gulp = require('gulp');
	var Techy = require('techy').gulp();

	gulp.task('default', function() {
	    gulp.src('./src/**/*.md')
	    .pipe(Techy())
	    .pipe(gulp.dest('./dest'));
	});

The `.gulp` method may accept an object. It acts as a [master config](/techy/docs/#master-config). You could set `root`, `src` or even `css` properties.

Here is an example which involves Gulp watcher.

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

---

A good example of using Techy as a Gulp plugin could be found [here](https://github.com/krasimir/techy/tree/master/example/as-gulp-plugin).

<% template('social') %>

---

.grid

<% disqus() %>

.

<% template('footer') %>
<% template('ga') %>
<% template('ribbon') %>