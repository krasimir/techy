module.exports = function() {
	var info = this.get('info');
	if(info && info.pages) {
		return info.pages.length;
	} else {
		return '';
	}
}