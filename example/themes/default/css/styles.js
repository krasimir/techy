module.exports = function(api) {
	api.import([
		__dirname + '/common.js',
		__dirname + '/landing.js',
		__dirname + '/pages/content.js',
		__dirname + '/pages/footer.js',
		__dirname + '/pages/nav.js',
		__dirname + '/pages/sitemap.js'
	]);
}