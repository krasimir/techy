module.exports = function(api) {
	api.settings = {
		// colors
		bgColor: '#FFF',
		textColor: '#313131',
		textColorLight: '#C1C1C1',
		borderColor: '#999',
		brandColor1: '#DC4141',
		// text
		font: "'Average Sans', sans-serif",
		fontSize: '20px',
		lowFontSize: '18px',
		lineHeight: '34px',
		lowLineHeight: '28px',
		// dimentions
		contentWidth: '740px'
	};
	api.import([
		__dirname + '/common/base.js',
		__dirname + '/common/titles.js',
		__dirname + '/common/scroller.js',
		__dirname + '/common/list.js',
		__dirname + '/elements/menu.js',
		__dirname + '/elements/content.js',
		__dirname + '/elements/code.js',
		__dirname + '/elements/footer.js',
		__dirname + '/elements/postinfo.js'
	]);
}