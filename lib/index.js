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
var queue = require('./helpers/queue');
var extend = require('./helpers/extend');

ncp.limit = 16;

var Techy = function(r, t, callback, config) {

	var root = r || process.cwd();

	config = config || {};
	config.noLogging = config.noLogging || false,
	config.actAsGulpPlugin = config.actAsGulpPlugin || false;
	config.techyFile = config.techyFile || (argv.config ? root + '/' + argv.config : null);
	config.src = config.src || path.normalize(fs.existsSync(root + '/src') ? root + '/src' : (argv.src ? root + '/' + argv.src : root));
	config.dest = config.dest || path.normalize(argv.dest ? root + '/' + argv.dest : root + '/dest');

	var rootTechy = __dirname;
	var theme = t || argv.theme || 'default';
	var overwrite = argv.forceUpdate;
	var CSSDirToWatch = '';

	var api = {
		config: config,
		root: root,
		publicDir: config.dest + '/public',
		rootTechy: rootTechy,
		theme: theme,
		themeDir: '',
		pages: [],
		init: function(cb) {
			queue([
				// creating dest folder
				function(next) {
					if(!fs.existsSync(config.dest)) {
						fs.mkdirSync(config.dest);
					}
					next();
				},
				// copying theme folder
				function(next) {
					api.copyFolder(api.rootTechy + '/themes', api.root + '/themes', function() {
						if(fs.existsSync(api.root + '/themes/' + theme)) {
							api.themeDir = api.root + '/themes/' + theme;
						} else if(fs.existsSync(api.rootTechy + '/themes/' + theme)) {
							api.themeDir = api.rootTechy + '/themes/' + theme;
						} else {
							throw new Error('Techy: there is no theme with name \'' + theme + '\'!');
							return;
						}
						next();
					});
				},
				// copying public folder
				function(next) {
					api.copyFolder(api.themeDir + '/public', api.publicDir, function() {						
						next();
					});
				},
				// end
				function() {
					cb();
				}
			], this)
			return this;
		},
		copyFolder: function(source, destination, cb) {
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
		compilePages: function(cb) {
			if(!this.pagesPattern) {
				this.pagesPattern = [config.src + '/**/*.md', '!' + config.src + '/node_modules/**'];
				if(api.masterConfig.process) {
					for(var p in api.masterConfig.process) {
						api.masterConfig.process[p] = root + '/' + api.masterConfig.process[p];
					}
					this.pagesPattern = this.pagesPattern.concat(api.masterConfig.process)
				}
			}
			gulp.src(this.pagesPattern)
			.pipe(Factory.gulp())
			.pipe(gulp.dest(config.dest))
			.pipe(GulpEnd(function() {
				!config.noLogging ? console.log('+ ' + 'Pages'.green + ' compiled') : null;
				cb ? cb() : null;
			}));
			return this;
		},
		compileCSS: function(cb) {

			var preprocessor = 'css', index = this.themeDir + '/css/**/*.css';
			if(api.masterConfig.css) {
				preprocessor = api.masterConfig.css.preprocessor || preprocessor;
				index = api.masterConfig.css.index ? api.root + '/' + api.masterConfig.css.index : index;
			}

			CSSDirToWatch = index;

			switch(preprocessor) {
				case 'less':
					var less = require('gulp-less');
					gulp.src(index)
				    .pipe(less({
						paths: [ path.join(__dirname, 'less', 'includes') ]
					}))
				    .pipe(gulp.dest(this.publicDir))
				    .pipe(GulpEnd(cb));
				break;
				case 'sass':
					var sass = require('gulp-sass');
					gulp.src(index)
				    .pipe(sass())
				    .pipe(gulp.dest(this.publicDir))
				    .pipe(GulpEnd(cb));
				break;
				case 'absurd':
					gulp.src(index)
				    .pipe(absurd({
				        minify: true,
				        combineSelectors: false
				    }))
				    .pipe(gulp.dest(this.publicDir))
				    .pipe(GulpEnd(cb));
				break;
				default:
					gulp.src(index)
				    .pipe(concat('styles.css'))
				    .pipe(gulp.dest(this.publicDir))
				    .pipe(GulpEnd(cb));
				break;
			}

		    !config.noLogging ? console.log('+ ' + 'CSS'.green + ' compiled') : null;
		    return this;
		},
		compileJS: function(cb) {
			gulp.src(this.themeDir + '/js/**/*.js')
			// .pipe(uglify())
			.pipe(concat('scripts.js'))
			// .pipe(jshint())
			// .pipe(jshint.reporter('default'))
			.pipe(gulp.dest(this.publicDir))
			.pipe(GulpEnd(cb));
			!config.noLogging ? console.log('+ ' + 'JavaScript'.green + ' compiled') : null;
		    return this;
		},
		watchFiles: function() {
			gulp.watch(this.pagesPattern, function(event) {
				this.compilePages();
			}.bind(this));
			gulp.watch([CSSDirToWatch], function(event) {
				this.compileCSS();
			}.bind(this));
			gulp.watch([this.themeDir + '/js/**/*.js'], function(event) {
				this.compileJS();
			}.bind(this));
			gulp.watch([this.themeDir + '/tpl/**/*.html'], function(event) {
				this.compilePages();
			}.bind(this));
			!config.noLogging ? console.log('Techy is listening for changes!'.green) : null;
			return this;
		},
		setMasterConfig: function(cb) {
			if(fs.existsSync(root + '/Techy.js')) {
				api.masterConfig = extend(config, require(root + '/Techy.js')());
			} if(fs.existsSync(api.themeDir + '/TechyFile.js')) {
				api.masterConfig = extend(config, require(api.themeDir + '/TechyFile.js')());
			} else if(fs.existsSync(root + '/TechyFile.js')) {
				api.masterConfig = extend(config, require(root + '/TechyFile.js')());
			} else if(config && config.techyFile && fs.existsSync(config.techyFile)) {
				api.masterConfig = extend(config, require(config.techyFile)());
			} else {
				api.masterConfig = config;
			}
			cb();
		}
	}

	var Factory = api.factory = require('./Factory')(api);

	queue([
		api.init,
		api.setMasterConfig,
		api.compileCSS,
		api.compileJS,
		!config.actAsGulpPlugin ? api.compilePages : function(cb) { cb(); },
		callback || function() {}
	], api);
	
	return api;
}

module.exports = Techy;

module.exports.gulp = function(settings) {
	settings = settings || {};
	var T = Techy(
		settings.root || process.cwd(),
		settings.theme || 'default',
		function() {},
		extend({
			noLogging: true,
			actAsGulpPlugin: true
		}, settings)
	);
	return function() {
		return T.compileCSS().compileJS().factory.gulp();
	}
}

if(!module.parent) {
	Techy(false, false, function() {
		this.watchFiles();
	});
}