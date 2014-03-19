absurd.component("SiteMap", {
	sitemapWidth: 400,
	html: '.sitemap',
	css: {
		'.sitemap': {
			d: 'b',
			wid: '0px',
			ov: 'h',
			right: 0,
			pos: 'f',
			hei: '100%',
			'&.open': {
				wid: '400px'
			},
			'.links': {
				hei: 'auto'
			},
			'@media all and (max-width: 700px)': {
				'&.open': {
					wid: '100%'
				}
			}
		}
	},
	sitemapOpen: function() {
		this.dispatch('updateContentWidth', {isSiteMapOpen: true, diff: this.sitemapWidth});
		var contentHeight = this.qs('.content', false).offsetHeight;
		this.css['.sitemap'].hei = contentHeight + 'px';
		this.css['.sitemap']['.links'].hei = (contentHeight - 128) + 'px';
		this.populate().addClass('open');
	},
	sitemapClose: function() {
		this.dispatch('updateContentWidth', {isSiteMapOpen: false, diff: this.sitemapWidth});
		this.css['.sitemap'].wid = '0px';
		this.populate().removeClass('open');
	},
	close: function(e) {
		if(e) e.preventDefault();
		this.sitemapClose();
		SiteMapButton.open = false;
	},
	ready: function() {
		this.populate();
		this.wire('sitemapOpen');
		this.wire('sitemapClose');
	}
})();

var SiteMapButton = absurd.component("SiteMapButton", {
	html: '.sitemap-button',
	open: false,
	clicked: function(e) {
		e.preventDefault();
		this.open = !this.open;
		this.dispatch('sitemap' + (this.open ? 'Open' : 'Close'));
	},
	ready: function() {
		this.populate();
	}
})();