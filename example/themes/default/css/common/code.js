module.exports = function(api) {
	api.add({
		'code[class*="language-"], pre[class*="language-"]': {
			fz: '14px',
			lh: '20px',
			'p &': {
				fz: '18px',
				bd: 'solid 1px #D8D8D8',
				d: 'ib',
				pad: '0 10px 0 10px'
			}
		},
		'pre': {
			'-wm-bxsh': '0 0 2px 1px #ccc'
		},
	});
}