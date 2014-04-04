module.exports = function(api) {
	var settings = api.settings.layouts.techy;
	api.add({
		'.techy': {
			pb: settings.gapb,
			'p, h1, h2, h3, h4, h5, h6, .grid, pre[class*="language-"]': {
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
				bg: 'url(/techy/themes/techy/public/img/techy.jpg) no-repeat center',
				bgz: 'cover',
				mt: settings.gapb,
				mb: settings.gapb
			},
			h1: {
				lh: '40px',
				mt: '80px',
				small: { fz: '20px' }
			}
		}
	});
}