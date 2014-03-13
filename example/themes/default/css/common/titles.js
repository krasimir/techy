module.exports = function(api) {
	api.add({
		h1: {
			fz: '70px',
			lh: '80px',
			pad: '0 0 40px 0',
			mar: '50px 0 30px 0',
			bdb: 'solid 8px ' + api.lighten(api.settings.borderColor, 50),
			ta: 'c'
		},
		h2: {
			fz: '36px',
			lh: '40px'
		},
		h3: {
			fz: '36px',
			lh: '40px',
			fw: 'n'
		},
		h4: {
			fz: '30px',
			lh: '34px',
			fw: 'n'	
		},
		h5: {
			fz: '24px',
			lh: '28px',
			fw: 'n'	
		},
		h6: {
			fz: '20px',
			lh: '24px'	
		}
	})
}