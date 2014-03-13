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
var glob = require('glob');
var argv = require('minimist')(process.argv.slice(2));
var pages = require(rootTechy + "/tasks/pages");
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
		pages: [],

		verifyDirs: function(callback) {
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
		init: function() {
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
		collectSiteInfo: function() {
			var info = { pages: [] };
			var mdFiles = glob.sync(this.root + '/**/*.md');
			for(var i=0; i<mdFiles.length; i++) {
				var mdContent = fs.readFileSync(mdFiles[i]).toString('utf8');
				var page = pages(this).parser(mdContent);				
				info.pages.push(page);
			}
			return info;
		},
		compilePages: function() {
			var info = this.collectSiteInfo();
			gulp.src(root + '/**/*.md').pipe(pages(this).process(info));
			return this;
		},
		compilePage: function(src) {
			var info = this.collectSiteInfo();
			gulp.src(src).pipe(pages(this).process(info));
			return this;
		},
		compileCSS: function() {
			gulp.src(this.themeDir + '/css/styles.js')
		    .pipe(absurd({
		        minify: false,
		        combineSelectors: false
		    }))
		    .pipe(gulp.dest(this.publicDir));
		    console.log('+ ' + 'CSS'.green + ' compiled');
		    return this;
		},
		compileJS: function() {
			gulp.src(this.themeDir + '/js/**/*.js')
			// .pipe(uglify())
			.pipe(concat('scripts.js'))
			// .pipe(jshint())
			// .pipe(jshint.reporter('default'))
			.pipe(gulp.dest(this.publicDir));
			console.log('+ ' + 'JavaScript'.green + ' compiled');
		    return this;
		},
		copyPublicDir: function() {
			var source = this.themeDir + '/public';
			var destination = this.root + '/public';
			ncp(source, destination, function (err) {
	            if(err === null) {
					console.log('+ ' + 'Public files'.green + ' copied');
	        	} else {
	        		throw new Error('Techy: I can\'t copy /public folder!');
	        	}
	        });
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
}

Techy()
.verifyDirs(function() {
	this
	.init()
	.compileCSS()
	.compileJS()
	.compilePages()
	.copyPublicDir()
	.watchFiles();	
});