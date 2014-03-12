var Entities = require('html-entities').XmlEntities;
var entities = new Entities();
var glob = require('glob');
var path = require('path');
var techy = {}, techyFiles, mdFiles;
var colors = require('colors');

var parser = function(content) {
    var re = /<p>@?techy\.(.+)/g, str = content;
    while(match = re.exec(content)) {
        var scope = createMethods({
            content: '',
            root: techy.root,
            rootTechy: techy.rootTechy,
            theme: techy.theme,
            themeDir: techy.themeDir
        });
        var code = match[0], src = match[0], result = '';
        code = code.replace('<p>', '').replace('</p>', '').replace('@techy', 'techy');
        code = entities.decode(code);
        code = '\
            var techy = this;\
            ' + code + ';\
            return this.content;\
        ';
        code = code.replace(/(\t|\r|\n|  )/g, '');
        result = new Function(code).apply(scope);
        str = str.replace(src, result);
    }
    return str;
}

var createMethods = function(scope) {
    for(var i=0; i<techyFiles.length; i++) {
        var f = require(techyFiles[i]);
        var name = path.basename(techyFiles[i]).replace('.techy.js', '');
        scope[name] = f;
    }
    return scope;
}

module.exports = function(t) {

    techy = t;
    techyFiles = glob.sync(techy.themeDir + '/**/*.techy.js').concat(glob.sync(techy.root + '/**/*.techy.js'));

    var absurd = require('absurd')();
    var through2 = require('through2');
    var gutil = require('gulp-util');
    var PluginError = gutil.PluginError;
    var path = require('path');
    var fs = require("fs");
    var marked = require('marked');

    function transform (file, enc, next) {
        var self = this;

        if(file.isNull()) {
            this.push(file); // pass along
            return next();
        }

        if(file.isStream()) {
            this.emit('error', new PluginError('page', 'Streaming not supported'));
            return next();
        }

        var fileRoot = path.dirname(file.path);
        var htmlFile = path.basename(file.path).replace(".md", ".html");
        var content = fs.readFileSync(file.path).toString('utf8');
        content = marked(content);
        content = parser(content);

        fs.writeFileSync(fileRoot + '/' + htmlFile, content, {encoding: 'utf8'});
        console.log('+ ' + file.path.replace(techy.root, '').replace(".md", ".html").green + ' file generated');

        return next();

    }

    return through2.obj(transform);
}