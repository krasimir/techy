var fs = require('fs');
var absurd = require('absurd')();
module.exports = function(file, data) {
	file = file.indexOf('.html') > 0 ? file : file + '.html';
	var process = function(template) {
		template = fs.readFileSync(template).toString();
		var result = '';
		absurd.flush().morph('html').add(template).compile(function(err, html) {
			result = html;
		}, data);
		this.content = result;
		return result;
	}
	if(fs.existsSync(this.themeDir + '/tpl/' + file)) {
		return process(this.themeDir + '/tpl/' + file);
	} else if(this.root + '/' + file) {
		return process(this.root + '/' + file);
	} else {
		throw new Error('There is no \'' + file + '\' in \'' +  this.themeDir + '/tpl/\' directory.');
	}
}