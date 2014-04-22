var fs = require('fs');
var absurd = require('absurd')();
module.exports = function(file, data) {
	file = file.indexOf('.html') > 0 || file.indexOf('.md') > 0 || file.indexOf('.markdown') > 0 ? file : file + '.html';
	var process = function(template) {
		var ext = template.split('.').pop().toLowerCase();
		if(ext == 'md' || ext == 'markdown') {
			data = data || {};
			data.paths = this.get('paths');
			if(this.parseMarkdownFile) {
				return this.parseMarkdownFile({
					path: template
				}, null, true, data);
			}
			return '';
		} else {
			template = fs.readFileSync(template).toString();
			var result = '';
			absurd.flush().morph('html').add(template).compile(function(err, html) {
				result = html;
			}, data);
			return result;
		}
	}.bind(this);
	if(fs.existsSync(this.themeDir + '/tpl/' + file)) {
		return process(this.themeDir + '/tpl/' + file);
	} else if(this.root + '/' + file) {
		return process(this.root + '/' + file);
	} else {
		throw new Error('There is no \'' + file + '\' in \'' +  this.themeDir + '/tpl/\' directory.');
	}
}