module.exports = function(api) {
	api.add({
		'.content': {
			'z-index': 50
		},
		'.content-container': {
			pos: 'r',
			maw: api.settings.contentWidth,
			mar: '0 auto',
			padding: '30px'
		}
	});
}