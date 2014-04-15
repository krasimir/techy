---
title: Techy / Use Techy as Gulp plugin
---

# Use Techy as Gulp plugin<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Back to the documentation](/techy/docs)</small>

Techy is based on Gulp and it could be used as a Gulp plugin. All you have to do is to `techy` module dependency in your `package.json` file. Here is an example:

	var gulp = require('gulp');
	var Techy = require('techy').gulp({
		root: __dirname, // required
		theme: 'default', // not required,
		customVar: 'friend'
	});