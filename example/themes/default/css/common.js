module.exports = function(api) {
	api.colors = {
		brandColor1: '#F0F0F0',
		brandColor2: '#DDD'
	};
	api.add({
		'body, html': {
			wid: '100%',
			hei: '100%',
			pad: 0,
			mar: 0,
			fz: '18px',
			lh: '24px',
			ff: "'Average Sans', sans-serif",
			color: '#393939'
		},
		a: {
			fw: 'b',
			color: '#393939',
			ted: 'n',
			'&:hover': {
				color: '#A21518',
				bdb: 'dotted 1px #999'
			}
		},
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
		'.left': {
			fl: 'l'
		},
		'.right': {
			fl: 'r'
		}
	});

	/* Scroller */
	api.add({
		/* Let's get this party started */
		'::-webkit-scrollbar': {
		    wid: '8px'
		},
		/* Track */
		'::-webkit-scrollbar-track': {
		    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
		    '-w-border-radius': '2px'
		},
		/* Handle */
		'::-webkit-scrollbar-thumb': {
		    '-w-border-radius': '2px',
		    bg: 'rgba(150,150,150,0.8)',
		    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)'
		},
		'::-webkit-scrollbar-thumb:window-inactive': {
			bg: 'rgba(150,150,150,0.4)'
		}
	});

}