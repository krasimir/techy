module.exports = function(api) {
	api.add({
		'.sitemap': {
			bg: '#000',
			d: 'n',
			color: '#FFF',
			'-w-trs': 'all 600ms',
			'z-index': 100,
			'.close': {
				hei: '84px',
				bdb: 'dotted 1px #3D3D3D',
				mar: '0 0 20px 0',
				a: {
					fz: '30px',
					d: 'ib',
					color: '#999',
					fl: 'r',
					mar: '30px 25px 0 0',
					'&:hover': {
						bdb: 'n',
						color: '#fff'
					}
				}
			},
			ul: {
				mar: '0 0 0 22px',
				pad: 0,
				lis: 'n'
			},
			a: {
				color: '#FFF',
				fw: 'n',
				'&.active': {
					ted: 'l',
					color: '#8F8F8F'
				}
			},
			'.links': {
				wid: '360px',
				ovy: 's',
				ovx: 'h',
				mar: '0 10px 0 0'
			}
		}
	})
}