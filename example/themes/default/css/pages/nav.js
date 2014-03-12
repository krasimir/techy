module.exports = function(api) {
	api.add({
		'.content-nav': {
			cf: 'after',
			pad: 0,
			mar: 0,
			bdb: 'dotted 1px #999',
			mah: '84px',
			ul: {
				lis: 'n',
				pad: 0,
				mar: 0,
				li: {
					pad: 0,
					mar: 0,
					a: {
						pad: '30px',
						d: 'ib',
						opacity: '0.5',
						ov: 'h',
						'&:hover': {
							opacity: 1,
							bdb: 'n',
							span: {
								moveto: '0/0',
								opacity: 1
							}
						},
						span: {
							'-w-trs': 'all 400ms',
							d: 'ib',
							moveto: '0/-60px',
							opacity: 0,
							'@media all and (max-width: 280px)': {
								d: 'n'
							}
						}
					}
				}
			}
		}
	})
}