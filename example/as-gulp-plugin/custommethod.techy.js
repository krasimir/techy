module.exports = function() {
	return 'The title of page B is ' + this.page('B').get('title');
}