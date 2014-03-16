var Entities = require('html-entities').XmlEntities;
var glob = require('glob');
var path = require('path');
var colors = require('colors');
var absurd = require('absurd')();
var through2 = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require("fs");
var marked = require('marked');

var techy = {}, techyFiles, mdFiles, page;
var PluginError = gutil.PluginError;
var entities = new Entities();

var Page = function() {
    var cls = createMethods({
        root: techy.root,
        rootTechy: techy.rootTechy,
        theme: techy.theme,
        themeDir: techy.themeDir,
        site: techy.site,
        title: 'Techy',
        layout: 'layouts/basic'
    });
    cls.set = function(key, value) {
        this[key] = value;
        return this;
    };
    cls.get = function(key) {
        return this[key];
    };
    cls.build = function() {
        return this.template(this.get('layout'), this);
    };
    return cls;
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
    techyFiles = glob.sync(techy.root + '/**/*.techy.js');    
    var api = {
        process: function(site) {
            techy.site = site;
            function transform (file, enc, next) {
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
                var content = api.parser(fs.readFileSync(file.path).toString('utf8')).build();
                fs.writeFileSync(fileRoot + '/' + htmlFile, content, {encoding: 'utf8'});
                console.log('+ ' + file.path.replace(techy.root, '').replace(".md", ".html").green + ' file generated');
                return next();
            }
            return through2.obj(transform);
        },
        parser: function(content) {
            content = marked(content);
            content = content.replace(/<code>/g, '<code class="language-javascript">');
            var re = /@?techy\.(.+);/gm, str = content;
            page = Page();
            while(match = re.exec(content)) {
                var code = match[0], src = match[0], result = '';
                code = code.replace('<p>', '').replace('</p>', '').replace('@techy', 'techy');
                code = entities.decode(code);
                code = 'var techy = this;return ' + code + ';';
                code = code.replace(/(\t|\r|\n|  )/g, '');
                try {
                    var codeResult = new Function(code).apply(page);
                    result = typeof codeResult === 'string' || typeof codeResult === 'number' ? codeResult : '';
                } catch(e) {
                    result = src;
                }
                str = str.replace('<p>' + src + '</p>', result || '').replace(src, result || '');
            }
            // console.log('\n\n', page.build(str));
            page.set('content', str);
            return page;
        }
    }
    return api;
}