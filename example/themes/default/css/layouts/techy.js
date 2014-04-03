module.exports = function(api) {
	var settings = api.settings.layouts.techy;
	api.add({
		'.techy': {
			pb: '40px',
			'p, h1, h2, h3, h4, h5, h6, pre[class*="language-"]': {
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
				bgz: 'cover',
				mt: '40px',
				mb: '40px'
			}
		}
	});
}