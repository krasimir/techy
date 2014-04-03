module.exports = function(api) {
	var settings = api.settings.layouts.techy;
	api.add({
		'.techy': {
			'p, h1, h2, h3, h4, h5, h6': {
				maw: settings.contentWidth,
				ml: 'a',
				mr: 'a',
				'-wm-bxz': 'bb',
				pl: settings.gap,
				pr: settings.gap
			},
			'.full-img': {
				wid: '100%',
				hei: '360px',
				bg: 'url(/public/img/techy.jpg) no-repeat center',
				bgz: 'cover'
			}
		}
	});
}