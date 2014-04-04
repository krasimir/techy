module.exports = function(api) {
	api.add({
		'.content': {
			maw: api.settings.layouts.post.contentWidth,
			mar: '0 auto'
		}
	});
}