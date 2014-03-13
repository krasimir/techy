module.exports = function(api) {
	api.add({
		'.post-info': {
			ta: 'c',
			pad: '0 0 80px 0',
			bdb: 'solid 8px ' + api.lighten(api.settings.borderColor, 50),
			color: api.settings.textColorLight,
			p: {
				mar: 0,
				pad: 0,
				'&.date': {
					fz: '18px',
					fs: 'i'
				},
				'&.tags': {
					a: {
						fz: '14px',
						color: api.settings.textColorLight,
						d: 'ib',
						mar: '0 4px 0 4px',
						fw: 'n',
						bdb: 'solid 1px #FFF',
						'&:hover': {
							bdb: 'dotted 1px ' + api.settings.borderColor
						}
					}
				}
			}
		}
	})
}