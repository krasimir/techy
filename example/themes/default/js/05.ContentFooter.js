absurd.component('ContentFooter', {
	html: '.footer-content',
	css: {
		'.footer-content': {
			hei: '9px',
			'.open': {
				'-w-trs': 'all 1000ms',
				'-wmso-trf': 'rotate(0)'
			}
		}
	},
	toggle: function(e) {
		e.preventDefault();
		if(!this.open) {
			this.open = true;
			this.css['.footer-content'].hei = '150px';
			this.css['.footer-content']['.open']['-wmso-trf'] = 'rotate(180deg)';
		} else {
			this.open = false;
			this.css['.footer-content'].hei = '9px';
			this.css['.footer-content']['.open']['-wmso-trf'] = 'rotate(0)';
		}
		this.populate();
	},
	ready: function() {
		this.populate();
	}
})();