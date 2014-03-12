absurd.component("Content", {
	css: {
		'.content': {
			wid: '100%',
			hei: '100%',
			'@media all and (max-width: 1000px)': {
				wid: '100%'
			}
		}
	},
	updateContentWidth: function(options) {
		var currentWidth = parseInt(this.getStyle('width', this.qs('.content', false)).replace('px', ''))
		this.css['.content'].wid = (currentWidth - (options.isSiteMapOpen ? options.diff : -options.diff)) + 'px';
		this.populate();
	},
	ready: function() {
		this.wire('updateContentWidth');
		this.populate();
	}
})();