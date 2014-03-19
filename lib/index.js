#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var gulp = require('gulp');
var absurd = require('gulp-absurd');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var argv = require('minimist')(process.argv.slice(2));
var ncp = require('ncp').ncp;
var through2 = require('through2');
var GulpEnd = require('./GulpEnd');
ncp.limit = 16;

var Techy = function(r, t, callback, noLogging) {

	var root = r || process.cwd();
	var rootTechy = __dirname;
	var theme = t || argv.theme || 'default';

	var api = {
		noLogging: noLogging,
		root: root,
		publicDir: root + '/public',
		rootTechy: rootTechy,
		theme: theme,
		themeDir: '',
		pages: [],
		init: function(cb) {
			// theme folder
			var copyThemeFolder = function() {
				this.copyFolder(this.rootTechy + '/themes', this.root + '/themes', function() {
					if(fs.existsSync(this.root + '/themes/' + theme)) {
						api.themeDir = this.root + '/themes/' + theme;
					} else if(fs.existsSync(this.rootTechy + '/themes/' + theme)) {
						this.themeDir = this.rootTechy + '/themes/' + theme;
					} else {
						throw new Error('Techy: there is no theme with name \'' + theme + '\'!');
						return;
					}
					copyPublicFolder.apply(this);
				}.bind(this));
			}
			var copyPublicFolder = function() {
				this.copyFolder(this.themeDir + '/public', this.root + '/public', function() {
					cb();
				}.bind(this));
			}
			copyThemeFolder.apply(this);
			return this;
		},
		copyFolder: function(source, destination, cb, overwrite) {
			if(fs.existsSync(destination) && !overwrite) {
				cb();
				return;
			}
			var self = this;
			ncp(source, destination, function (err) {
	            if(err === null) {
	            	cb.apply(self);
	        	} else {
	        		throw new Error('Techy: I can\'t copy ' + source + ' folder!');
	        	}
	        });
		},
		compilePages: function() {
			gulp.src(root + '/**/*.md').pipe(Factory.gulp).pipe(GulpEnd(callback));
			return this;
		},
		compilePage: function(src) {
			gulp.src(src).pipe(Factory.gulp);
			return this;
		},
		compileCSS: function() {
			gulp.src(this.themeDir + '/css/styles.js')
		    .pipe(absurd({
		        minify: true,
		        combineSelectors: false
		    }))
		    .pipe(gulp.dest(this.publicDir));
		    !noLogging ? console.log('+ ' + 'CSS'.green + ' compiled') : null;
		    return this;
		},
		compileJS: function() {
			gulp.src(this.themeDir + '/js/**/*.js')
			// .pipe(uglify())
			.pipe(concat('scripts.js'))
			// .pipe(jshint())
			// .pipe(jshint.reporter('default'))
			.pipe(gulp.dest(this.publicDir));
			!noLogging ? console.log('+ ' + 'JavaScript'.green + ' compiled') : null;
		    return this;
		},
		watchFiles: function() {
			gulp.watch([root + '/**/*.md'], function(event) {
				this.compilePage(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/css/**/*.js'], function(event) {
				this.compileCSS(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/js/**/*.js'], function(event) {
				this.compileJS(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/public/**/*.*'], function(event) {
				this.copyPublicDir(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/tpl/**/*.html'], function(event) {
				this.compilePages();
			}.bind(this));
			return this;
		}
	}

	var Factory = require('./Factory')(api);

	return api.init(function() {
		this
		.compileCSS()
		.compileJS()
		.compilePages();
	}.bind(api))
}

module.exports = Techy;

// if(!module.parent) {
// 	Techy()
// 	.verifyDirs(function() {
// 		this
// 		.init()
// 		.compileCSS()
// 		.compileJS()
// 		.compilePages()
// 		.copyPublicDir()
// 		.watchFiles();	
// 	});
// }

