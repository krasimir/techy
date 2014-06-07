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

var Techy = function(r, callback, config) {

	var root = path.normalize(r || process.cwd());
	var defaultDestinationDir = '_dist';
	var rootTechy = __dirname;

	config = config || {};
	config.noLogging = config.noLogging || false,
	config.actAsGulpPlugin = config.actAsGulpPlugin || false;
	config.techyFile = config.techyFile || (argv.config ? root + '/' + argv.config : null);
	config.src = config.src || root;
	config.dest = config.dest || path.normalize(argv.dest ? root + '/' + argv.dest : root + '/' + defaultDestinationDir);
	config.theme = config.theme || argv.theme || false;
	config.overwrite = argv.forceUpdate;

	var CSSDirToWatch = '';

	var api = {
		config: config,
		root: root,
		rootTechy: rootTechy,
		pages: [],
		copyingDefaultFiles: function(cb) {
			if(api.config.theme) {
				var themeDir = '';
				if(fs.existsSync(api.rootTechy + '/themes/' + api.config.theme)) {
					themeDir = path.normalize(api.rootTechy + '/themes/' + api.config.theme);
				} else {
					throw new Error('Techy: there is no theme with name \'' + api.config.theme + '\'!');
					return;
				}
				var resourcesToCopy = fs.readdirSync(themeDir);
				(function copying() {
					if(resourcesToCopy.length == 0) {
						cb();
					} else {
						var item = resourcesToCopy.shift();
						api.copyFolder(
							path.normalize(themeDir + '/' + item),
							path.normalize(config.src + '/' + item),
							copying
						);
					}
				})();
			} else {
				cb();
			}
		},
		setMasterConfig: function(cb) {
			if(fs.existsSync(root + '/Techy.js')) {
				api.config = extend(api.config, api.processTechyFile(root + '/Techy.js'));
			} if(fs.existsSync(api.themeDir + '/TechyFile.js')) {
				api.config = extend(api.config, api.processTechyFile(api.themeDir + '/TechyFile.js'));
			} else if(fs.existsSync(root + '/TechyFile.js')) {
				api.config = extend(api.config, api.processTechyFile(root + '/TechyFile.js'));
			} else if(config && config.techyFile && fs.existsSync(config.techyFile)) {
				api.config = extend(api.config, api.processTechyFile(config.techyFile));
			}
			cb();
		},
		processTechyFile: function(techyFilePath) {
			var data = require(techyFilePath)();
			if(data.src) {
				data.src = path.normalize(root + '/' + data.src);
			}
			if(data.dest) {
				data.dest = path.normalize(root + '/' + data.dest);
			}
			return data;
		},
		creatingDestFolder: function(cb) {
			if(!fs.existsSync(api.config.dest)) {
				fs.mkdirSync(api.config.dest);
			}
			cb();
		},
		copyingNonSystemFiles: function(cb) {
			var resourcesToCopy = fs.readdirSync(config.src);
			var distDirectory = path.normalize(config.dest).split(/\/|\\/g).pop();
			(function copying() {
				if(resourcesToCopy.length == 0) {
					cb();
				} else {
					var item = resourcesToCopy.shift();
					if(
						item !== distDirectory && 
						item.indexOf('_') !== 0 &&
						item.indexOf('.') !== 0 &&
						item !== 'node_modules'
					) {
						var stat = fs.statSync(path.normalize(config.src + '/' + item));
						if(stat.isDirectory()) {
							api.copyFolder(
								path.normalize(root + '/' + item),
								path.normalize(api.config.dest + '/' + item),
								copying,
								true,
								function(file) {
									return file.split('.').pop().toLowerCase() !== 'md';
								}
							);
						} else {
							copying();
						}
					} else {
						copying();
					}					
				}
			})();
		},
		copyFolder: function(source, destination, cb, forceOverwrite, filter) {
			if(fs.existsSync(destination) && !api.config.overwrite && !forceOverwrite) {
				cb();
				return;
			}
			var self = this;
			ncp(source, destination, { 
				filter: filter
			}, function (err) {
	            if(err === null) {
	            	cb.apply(self);
	        	} else {
	        		throw new Error('Techy: I can\'t copy ' + source + ' folder!');
	        	}
	        });
		},
		compilePages: function(cb) {
			if(!this.pagesPattern) {
				this.pagesPattern = [
					api.config.src + '/**/*.md', 
					'!' + api.config.src + '/node_modules/**',
					'!' + api.config.dest + '/**/*.md'
				];
				if(api.config.process) {
					for(var p in api.config.process) {
						api.config.process[p] = root + '/' + api.config.process[p];
					}
					this.pagesPattern = this.pagesPattern.concat(api.config.process)
				}
			}
			gulp.src(this.pagesPattern)
			.pipe(Factory.gulp())
			.pipe(gulp.dest(api.config.dest))
			.pipe(GulpEnd(function() {
				!api.config.noLogging ? console.log('+ ' + 'Pages'.green + ' compiled') : null;
				cb ? cb() : null;
			}));
			return this;
		},
		compileCSS: function(cb) {
			if(api.config.css) {

				var preprocessor = 'css', 
					index = api.root + '/_css/**/*.css'
					out = path.normalize(api.root + '/_dist/css');

				if(api.config.css) {
					preprocessor = api.config.css.preprocessor || preprocessor;
					index = api.config.css.index ? api.root + '/' + api.config.css.index : index;
					out = api.config.css.out ? api.root + '/' + api.config.css.out : out;
				}

				CSSDirToWatch = index;

				switch(preprocessor) {
					case 'less':
						var less = require('gulp-less');
						gulp.src(index)
					    .pipe(less({
							paths: [ path.join(__dirname, 'less', 'includes') ]
						}))
					    .pipe(gulp.dest(out))
					    .pipe(GulpEnd(cb));
					break;
					case 'sass':
						var sass = require('gulp-sass');
						gulp.src(index)
					    .pipe(sass())
					    .pipe(gulp.dest(out))
					    .pipe(GulpEnd(cb));
					break;
					case 'absurd':
						gulp.src(index)
					    .pipe(absurd({
					        minify: true,
					        combineSelectors: false
					    }))
					    .pipe(gulp.dest(out))
					    .pipe(GulpEnd(cb));
					break;
					default:
						gulp.src(index)
					    .pipe(concat('styles.css'))
					    .pipe(gulp.dest(out))
					    .pipe(GulpEnd(cb));
					break;
				}

			    !api.config.noLogging ? console.log('+ ' + 'CSS'.green + ' compiled') : null;
			} else {
				cb();
			}
		    return this;
		},
		compileJS: function(cb) {
			cb && cb(); return;
			gulp.src(api.root + '/_js/**/*.js')
			// .pipe(uglify())
			.pipe(concat('scripts.js'))
			// .pipe(jshint())
			// .pipe(jshint.reporter('default'))
			.pipe(gulp.dest(api.root + '/public'))
			.pipe(gulp.dest(api.config.dest + '/public'))
			.pipe(GulpEnd(cb));
			!api.config.noLogging ? console.log('+ ' + 'JavaScript'.green + ' compiled') : null;
		    return this;
		},
		watchFiles: function() {
			gulp.watch(this.pagesPattern, function(event) {
				this.compilePages();
			}.bind(this));
			gulp.watch([CSSDirToWatch], function(event) {
				this.compileCSS();
			}.bind(this));
			gulp.watch([api.root + '/_js/**/*.js'], function(event) {
				this.compileJS();
			}.bind(this));
			gulp.watch([api.root + '/_tpl/**/*.html'], function(event) {
				this.compilePages();
			}.bind(this));
			!api.config.noLogging ? console.log('Techy is listening for changes!'.green) : null;
			return this;
		}
	}

	var Factory = api.factory = require('./Factory')(api);

	queue([
		api.setMasterConfig,
		api.copyingDefaultFiles,
		!api.config.actAsGulpPlugin ? api.creatingDestFolder : function(cb) { cb(); },
		api.compileCSS,
		api.compileJS,
		!api.config.actAsGulpPlugin ? api.compilePages : function(cb) { cb(); },
		api.copyingNonSystemFiles,
		callback || function() {}
	], api);
	
	return api;
}

module.exports = Techy;

module.exports.gulp = function(settings) {
	settings = settings || {};
	var T = Techy(
		settings.root || process.cwd(),
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
	Techy(false, function() {
		this.watchFiles();
	});
}