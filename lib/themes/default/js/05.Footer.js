absurd.component('Footer', {
	html: '.footer-content',
	css: {
		'.footer-content': {
			'@media all and (min-width: 500px)': {
				hei: '9px',
				'.open': {
					'-w-trs': 'all 1000ms',
					'-wmso-trf': 'rotate(0)'
				}
			}
		}
	},
	toggle: function(e) {
		e.preventDefault();
		var styles = this.css['.footer-content']['@media all and (min-width: 500px)'];
		if(!this.open) {
			this.open = true;
			styles.hei = '200px';
			styles['.open']['-wmso-trf'] = 'rotate(180deg)';
		} else {
			this.open = false;
			styles.hei = '9px';
			styles['.open']['-wmso-trf'] = 'rotate(0)';
		}
		this.populate();
	},
	ready: function() {
		this.populate();
	}
})();