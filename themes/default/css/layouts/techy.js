module.exports = function(api) {
	api.add({
		'.techy': {
			'p, h1, h2, h3, h4, h5, h6': {
				maw: api.settings.layouts.post.contentWidth,
				ml: 'a',
				mr: 'a'
			}
		}
	});
}