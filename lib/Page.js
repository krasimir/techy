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
        file: '',
        root: '',
        rootTechy: '',
        theme: '',
        themeDir: '',
        info: {},
        title: 'Techy',
        layout: 'layouts/empty'
    };
    api.set = function(key, value) {
        this[key] = value;
        return this;
    };
    api.get = function(key) {
        return this[key];
    };
    api.build = function() {
        api.registerMethods();
        return this.template(this.get('layout'), this);
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
    api.parser = function(content) {
        api.registerMethods();
        content = marked(content);

        // code
        content = content.replace(/<code>/g, '<code class="language-javascript">');
        // html tags
        content = content.replace(/<p>\.(.+)<\/p>/g, '<div class="$1">');
        content = content.replace(/<p>\.<\/p>/g, '</div>');

        content = entities.decode(content);
        var re = /<%( )?([^%>]*)%>/g, str = content;
        while(match = re.exec(content)) {
            var code = match[0], src = match[0], result = '';
            code = code.replace('<p>', '').replace('</p>', '').replace('@techy', 'techy').replace(/<% ?/g, '').replace(/ ?%>/g, '');
            code = 'with(techy) { return ' + code + '; }';
            code = code.replace(/(\t|\r|\n|  )/g, '');
            try {
                var codeResult = (new Function('techy', code)).apply(this, [this]);
                result = typeof codeResult === 'string' || typeof codeResult === 'number' ? codeResult : '';
            } catch(e) {
                console.log('\n\n', e, '\n\n');
                result = src;
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