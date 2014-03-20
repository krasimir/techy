var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var glob = require('glob');
var Page = require('./Page');
var PluginError = gutil.PluginError;

module.exports = function(api) {

    var getInfo = function() {
        var info = { pages: [] };
        var mdFiles = glob.sync(api.root + '/**/*.md');
        for(var i=0; i<mdFiles.length; i++) {
            var mdContent = fs.readFileSync(mdFiles[i]).toString('utf8');
            var page = Page()
            page.set('root', api.root);
            page.set('rootTechy', api.rootTechy);
            page.set('theme', api.theme);
            page.set('themeDir', api.themeDir);
            page.parser(mdContent);
            info.pages.push(page);
        }
        return info;
    }

	var createPage = function() {
        var page = Page();
		page.set('root', api.root);
        page.set('rootTechy', api.rootTechy);
        page.set('theme', api.theme);
        page.set('themeDir', api.themeDir);
        page.set('info', getInfo());
		return page;
	}

	function transform (file, enc, next) {

		var page = createPage();

        if(file.isNull()) {
            this.push(file); // pass along
            return next();
        }
        if(file.isStream()) {
            this.emit('error', new PluginError('page', 'Streaming not supported'));
            return next();
        }

        page.set('file', file.path);
        var fileRoot = path.dirname(file.path);
        var htmlFile = path.basename(file.path).replace(".md", ".html");
        var content = page.parser(fs.readFileSync(file.path).toString('utf8')).build();
        fs.writeFileSync(fileRoot + '/' + htmlFile, content, {encoding: 'utf8'});
        !api.noLogging ? console.log('+ ' + file.path.replace(api.root, '').replace(".md", ".html").green + ' file generated') : null;
        
        return next();
    }
    
    return {
    	gulp: through2.obj(transform),
    	create: createPage
    }

}