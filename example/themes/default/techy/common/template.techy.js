var fs = require('fs');
var absurd = require('absurd')();
module.exports = function(file, data) {
	var template = this.themeDir + '/tpl/' + file;
	if(fs.existsSync(template)) {
		template = fs.readFileSync(template).toString();
		var result = '';
		absurd.flush().morph('html').add(template).compile(function(err, html) {
			result = html;
		}, data);
		this.content = result;
		return result;
	} else {
		throw new Error('There is no \'' + file + '\' in \'' +  this.themeDir + '/tpl/\' directory.');
	}
}