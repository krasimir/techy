#!/usr/bin/env node

var root = process.cwd();
var rootTechy = __dirname;

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var gulp = require('gulp');
var absurd = require('gulp-absurd');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var argv = require('minimist')(process.argv.slice(2));
var pages = require(__dirname + "/tasks/pages");
var ncp = require('ncp').ncp;
ncp.limit = 16;

var theme = argv.theme || 'default';

var Techy = function() {
	return {

		root: root,
		publicDir: root + '/public',
		rootTechy: rootTechy,
		theme: theme,
		themeDir: '',

		__verifyDirs: function(callback) {
			// creating public directory
			if(!fs.existsSync(this.publicDir)) {
				fs.mkdirSync(this.publicDir);
			}
			// copying themes folder
			var source = this.rootTechy + '/themes';
			var destination = this.root + '/themes';
			var self = this;
			if(!fs.existsSync(destination)) {
				ncp(source, destination, function (err) {
		            if(err === null) {
						console.log('+ ' + 'Directories'.green + ' verified');
		            	callback.apply(self);
		        	} else {
		        		throw new Error('Techy: I can\'t copy themes folder!');
		        	}
		        });
			} else {
				callback.apply(self);
			}
		},
		__init: function() {
			if(fs.existsSync(this.root + '/themes/' + theme)) {
				this.themeDir = this.root + '/themes/' + theme;
			} else if(fs.existsSync(this.rootTechy + '/themes/' + theme)) {
				this.themeDir = this.rootTechy + '/themes/' + theme;
			} else {
				throw new Error('Techy: there is no theme with name \'' + theme + '\'!');
				return;
			}
			console.log(
				'--------------------------------\n', 
				'Techy'.bold + ' is working in\n ' + path.normalize(root).grey + '\n Theme: ' + theme + '\n ' + path.normalize(this.themeDir).grey, 
				'\n--------------------------------'
			);
			return this;
		},
		__compilePages: function() {
			gulp.src(root + '/**/*.md').pipe(pages(this));
			return this;
		},
		__compilePage: function(src) {
			gulp.src(src).pipe(pages(this));
			return this;
		},
		__compileCSS: function() {
			gulp.src(this.themeDir + '/css/styles.js')
		    .pipe(absurd({
		        minify: false,
		        combineSelectors: false
		    }))
		    .pipe(gulp.dest(this.publicDir));
		    console.log('+ ' + 'CSS'.green + ' compiled');
		    return this;
		},
		__compileJS: function() {
			gulp.src(this.themeDir + '/js/**/*.js')
			// .pipe(uglify())
			.pipe(concat('scripts.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(gulp.dest(this.publicDir));
			console.log('+ ' + 'JavaScript'.green + ' compiled');
		    return this;
		},
		__watchFiles: function() {
			gulp.watch([root + '/**/*.md'], function(event) {
				this.__compilePage(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/css/styles.js'], function(event) {
				this.__compileCSS(event.path);
			}.bind(this));
			gulp.watch([this.themeDir + '/js/**/*.js'], function(event) {
				this.__compileJS(event.path);
			}.bind(this));
		}
	}
}

Techy()
.__verifyDirs(function() {
	this
	.__init()
	.__compileCSS()
	.__compileJS()
	.__compilePages()
	.__watchFiles();	
});