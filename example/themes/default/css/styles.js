module.exports = function(api) {
	api.settings = {
		bgColor: '#FFF',
		textColor: '#4E4E4E',
		borderColor: '#999',
		brandColor1: '#DC4141'
	};
	api.import([
		__dirname + '/common/base.js',
		__dirname + '/common/titles.js',
		__dirname + '/common/scroller.js',
		__dirname + '/elements/menu.js',
		__dirname + '/elements/content.js',
		__dirname + '/elements/code.js',
		__dirname + '/elements/footer.js'
	]);
}