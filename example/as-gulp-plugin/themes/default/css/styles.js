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

		// layouts
		layouts: {
			techy: {
				gap: '20px',
				contentWidth: '740px'
			},
			post: {
				contentWidth: '740px'
			}
		}
		
	};

	api.import([
		__dirname + '/common/base.js',
		__dirname + '/common/titles.js',
		__dirname + '/common/scroller.js',
		__dirname + '/common/list.js',
		__dirname + '/common/code.js',
		__dirname + '/common/grids.js',
		__dirname + '/basic.js'
	]);

}