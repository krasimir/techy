module.exports = function(name) {
	var page, paths, result;
	if(typeof name == 'object') {
		page = name;
	} else {
		page = this.page(name);
	}
	paths = page.get('paths');
	result = this.get('paths').root + paths.self + (paths.self == '' ? '' : '/') + paths.file.replace(/.md/, '.html');
	return result;
}