var Entities = require('html-entities').XmlEntities;
var glob = require('glob');
var path = require('path');
var colors = require('colors');
var absurd = require('absurd')();
var path = require('path');
var fs = require("fs");
var marked = require('marked');

var entities = new Entities();

var Page = function() {

    var api = {
        infoPass: false, // true if the page is creating during the info pass
        root: '', // file system roote path
        rootTechy: '',  // file system roote path of the Techy
        theme: '', // the name of the current theme
        themeDir: '', // the path of the current theme
        info: {
            pages: []
        },
        paths: {
            root: '', // the path to the main route
            self: '', // the path of the current file to main route
            file: '', // the name of the markdown file
            url: '' // URL suitable for page linking
        },
        name: '',
        date: '',
        title: 'Techy',
        layout: 'layouts/basic',
    };
    api.set = function(key, value) {
        this[key] = value;
        return this;
    };
    api.get = function(key) {
        return this[key];
    };
    api.build = function(noLayout) {
        api.registerMethods();
        var file = this.get('layout').toString();
        if(!noLayout && file != 'none') {
            return this.template(file, this);    
        } else {
            return this.get('content');
        }
    };
    api.registerMethods = function() {
        var techyFiles = this.get('techyFiles');
        for(var i=0; i<techyFiles.length; i++) {
            var f = require(techyFiles[i]);
            var name = path.basename(techyFiles[i]).replace('.techy.js', '');
            this[name] = f;
        }
        return this;
    };
    // infoPass is true when Techy goes through the pages to fill the `info` property
    api.parser = function(content, infoPass, noMarkdown) {

        api.registerMethods();

        if(!noMarkdown) {
            content = marked(content);
        }

        // code
        content = content.replace(/<code>/g, '<code class="language-javascript">');
        // html tags
        content = content.replace(/<p>\.(.+)<\/p>/g, '<div class="$1">');
        content = content.replace(/<p>\.<\/p>/g, '</div>');

        content = entities.decode(content);

        var re = /<%( )?([^%>]*)%>/g, str = content;
        while(match = re.exec(content)) {
            var code = match[0], src = match[0], result = '', allowedMethods = /(set|get)\(('|")/g;
            code = code.replace('<p>', '').replace('</p>', '').replace('@techy', 'techy').replace(/<% ?/g, '').replace(/ ?%>/g, '');
            code = 'with(techy) { return ' + code + '; }';
            if(!noMarkdown) {
                code = code.replace(/(\t|\r|\n|  )/g, '');
            }
            if(infoPass && code.indexOf(allowedMethods) >= 0) {
                console.log('skipped', code);
                // skipping the code execution if the method is not allowed during the info pass phase
            } else {
                try {
                    var codeResult = (new Function('techy', code)).apply(this, [this]);
                    result = typeof codeResult === 'string' || typeof codeResult === 'number' ? codeResult : '';
                } catch(e) {
                    if(!infoPass) {
                        console.log('\n\n', e, '\nCode: ', code, '\n\n');
                    }
                    result = src;
                }
            }
            str = str.replace('<p>' + src + '</p>', result || '').replace(src, result || '');
        }
        // console.log('\n\n', page.build(str));
        this.set('content', str);
        return this;
    }

    return api;
}

module.exports = Page;