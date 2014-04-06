module.exports = function(name) {
	var page = this.page(name);
	var paths = page.get('paths');
	var result = this.get('paths').root + paths.self + (paths.self == '' ? '' : '/') + paths.file.replace(/.md/, '.html');
	return result;
}