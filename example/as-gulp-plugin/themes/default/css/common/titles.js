module.exports = function(api) {
	api.add({
		h1: {
			fz: '60px',
			lh: '70px',
			pad: '0 0 40px 0',
			mar: '50px 0 30px 0',
			'@media all and (max-width: 600px)': {
				fz: '40px',
				lh: '40px',
				mar: '20px 0 10px 0',
				pad: '0 0 20px 0'
			}
		},
		h2: {
			fz: '36px',
			lh: '40px',
			'@media all and (max-width: 600px)': {
				fz: '30px',
				lh: '30px'
			}
		},
		h3: {
			fz: '36px',
			lh: '40px',
			fw: 'n',
			'@media all and (max-width: 600px)': {
				fz: '26px',
				lh: '26px'
			}
		},
		h4: {
			fz: '30px',
			lh: '34px',
			fw: 'n',
			'@media all and (max-width: 600px)': {
				fz: '22px',
				lh: '22px'
			}
		},
		h5: {
			fz: '24px',
			lh: '28px',
			fw: 'n',
			'@media all and (max-width: 600px)': {
				fz: '18px',
				lh: '18px'
			}	
		},
		h6: {
			fz: '20px',
			lh: '24px',
			'@media all and (max-width: 600px)': {
				fz: '18px',
				lh: '18px'
			}	
		}
	})
}