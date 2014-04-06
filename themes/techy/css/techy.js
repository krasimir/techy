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
				maw: '1000px',
				hei: '600px',
				bg: 'url(img/landing.jpg) no-repeat center',
				bgz: 'cover',
				ml: 'a',
				mr: 'a',
				'@media all and (max-width: 930px)': { hei: '500px' },
				'@media all and (max-width: 770px)': { hei: '400px' },
				'@media all and (max-width: 620px)': { hei: '300px' },
				'@media all and (max-width: 470px)': { hei: '400px' }
			},
			h1: {
				lh: '40px',
				mt: '80px',
				small: { fz: '20px' }
			}
		}
	});
}