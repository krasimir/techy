absurd.component('TryIt', {
	css: {
		'.content-container': {
			'-w-trs': 'all 800ms',
			'-w-trstf': 'cubic-bezier(.15,.76,.29,.94)',
			maw: '100%'
		},
		'.doc-home': {
			d: 'n'
		}
	},
	ready: function(is, dom) {
		if(is.appended('.jsbin-widget')) {
			this.delay(800, function() {
				this.populate();
				dom('.jsbin-widget iframe').el.style.height = '600px';
			})
		}
	}
})();