module.exports = function(name) {
	var info = this.get('info');
	if(info && info.pages) {
		for(var i=0; i<info.pages.length; i++) {
			var page = info.pages[i];
			if(page.get('name') == name) {
				return page;
			}
		}
		throw new Error('There is no page with name "' + name + '".');
	} else {
		return '';
	}
}