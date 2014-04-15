---
title: Techy / Use Techy as Gulp plugin
---

# Use Techy as Gulp plugin<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Back to the documentation](/techy/docs)</small>

Techy is based on Gulp and it could be used as a Gulp plugin. All you have to do is to `techy` module dependency in your `package.json` file. Here is an example:

	var gulp = require('gulp');
	var Techy = require('techy').gulp({
		root: __dirname
	});

	gulp.task('default', function() {
	    gulp.src('./src/**/*.md')
	    .pipe(Techy)
	    .pipe(gulp.dest('./dest'));
	});

The `.gulp` method accepts an object. The only one required property is `root`. You may also use `theme` to apply another theme. The same object acts as a [master config](/techy/docs/#master-config) so feel free to set `css` or `process` properties. 

A little bit more complex example could be found [here](https://github.com/krasimir/techy/tree/master/example/as-gulp-plugin)

<% template('social') %>

---

.grid

<% disqus() %>

.

<% template('footer') %>
<% template('ga') %>
<% template('ribbon') %>