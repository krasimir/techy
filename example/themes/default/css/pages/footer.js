module.exports = function(api) {
	api.add({
		'.footer-content': {
			pos: 'f',
			bottom: 0,
			hei: '9px',
			wid: '100%',
			bg: '#000',
			color: '#FFF',
			'-w-trs': 'height 400ms',
			'@media all and (max-width: 500px)': {
				pos: 'r',
				hei: 'auto'
			},
			'.open': {
				d: 'b',
				ta: 'c',
				wid: '26px',
				hei: '26px',
				bdrsa: '13px',
				color: '#FFF',
				bg: '#000',
				pos: 'a',
				left: '50%',
				mar: '-8px 0 0 -15px',
				'@media all and (max-width: 500px)': {
					d: 'n'
				}
			},
			'.container': {
				maw: '740px',
				mar: '0 auto',
				padding: '30px',
				color: '#fff',
				grid: '2/div',
				lh: '34px',
				ta: 'c',
				'@media all and (max-width: 590px)': {
					div: {
						f: 'n',
						wid: '100%'
					}
				},
				h3: {
					pad: 0,
					mar: 0,
					fw: 'n',
					fz: '26px',
					color: '#959595'
				},
				a: {
					color: '#FFF'
				},
				p: {
					mar: 0,
					pad: 0
				},
				'.social': {
					a: {
						d: 'ib',
						mar: '0 8px 0 0'
					}
				}
			}
		}
	});
}