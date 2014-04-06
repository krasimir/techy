var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var glob = require('glob');
var Page = require('./Page');
var PluginError = gutil.PluginError;

module.exports = function(api) {

    var extend = function() {
        var process = function(destination, source) {   
            for (var key in source) {
                if (hasOwnProperty.call(source, key)) {
                    destination[key] = source[key];
                }
            }
            return destination;
        };
        var result = arguments[0];
        for(var i=1; i<arguments.length; i++) {
            result = process(result, arguments[i]);
        }
        return result;
    }

    var getPagePaths = function(file) {
        var p = path.dirname(path.normalize(file).replace(path.normalize(api.root), '')),
            numOfSlashes = 0,
            root = '';
        if(p == '\\') { numOfSlashes = 0; }
        else {
            var m = p.match(/\\/g);
            var numOfSlashes = m ? m.length : 0;
        }
        for(var i=0; i<numOfSlashes; i++) {
            root += '../';
        }
        return {
            root: root,
            self: p.replace(/\\/g, '/').substr(1),
            file: path.basename(file)
        };
    }

    var getInfo = function() {
        var info = { pages: [] };
        var mdFiles = glob.sync(api.root + '/**/*.md');
        for(var i=0; i<mdFiles.length; i++) {
            if(path.normalize(mdFiles[i].toString()).replace(/\\/g, '/').indexOf('/node_modules/') == -1) {
                var mdContent = fs.readFileSync(mdFiles[i]).toString('utf8');
                var page = extend(Page(), api.masterConfig);
                page.set('root', api.root);
                page.set('rootTechy', api.rootTechy);
                page.set('theme', api.theme);
                page.set('themeDir', api.themeDir);
                page.set('techyFiles', techyFiles);
                page.set('paths', getPagePaths(mdFiles[i]));
                page.set('infoPass', true);
                page.parser(mdContent, true);
                info.pages.push(page);
            } else {
                // console.log('Skipped: ' + mdFiles[i]);
            }
        }
        return info;
    }

    // collecting techy methods
    var techyFiles = [].concat(glob.sync(api.rootTechy + '/api/**/*.techy.js')).concat(glob.sync(api.root + '/**/*.techy.js'));
    var info = getInfo();

	var createPage = function() {
        var page = extend(Page(), api.masterConfig);
		page.set('root', api.root);
        page.set('rootTechy', api.rootTechy);
        page.set('theme', api.theme);
        page.set('themeDir', api.themeDir);
        page.set('techyFiles', techyFiles);
        page.set('info', info);
		return page;
	}

	function transform (file, enc, next) {

		var page = createPage();

        if(file.isNull()) {
            this.push(file); // pass along
            return next();
        }        
        if(path.normalize(file.path.toString()).replace(/\\/g, '/').indexOf('/node_modules/') >= 0) {
            this.push(file); // pass along
            return next();
        }
        if(file.isStream()) {
            this.emit('error', new PluginError('page', 'Streaming not supported'));
            return next();
        }

        page.set('paths', getPagePaths(file.path));

        var fileRoot = path.dirname(file.path);
        var htmlFile = path.basename(file.path).replace(".md", ".html");
        var content = page.parser(fs.readFileSync(file.path).toString('utf8')).build();
        fs.writeFileSync(fileRoot + '/' + htmlFile, content, {encoding: 'utf8'});
        !api.noLogging ? console.log('+ ' + file.path.replace(api.root, '').replace(".md", ".html").green + ' file generated') : null;
        
        return next();
    }
    
    return {
    	gulp: function() {
            return through2.obj(transform);
        },
    	create: createPage
    }

}