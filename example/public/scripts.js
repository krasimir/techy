absurd = Absurd();
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
absurd.component('LandingVideo', {
	html: '.landing .video-overlay',
	video: {
		'video[preload="auto" autoplay="true" loop="loop" muted="muted" volume="0" src="/public/video/cells.mp4"]': {
			'source[src="/public/video/cells.webm" type="video/webm"]': '',
			'source[src="/public/video/cells.mp4" type="video/mp4"]': ''
		}
	},
	ready: ['is', function(is) {
		if(is.appended() && document.body.clientWidth > 880) {
			this.populate();
			var self = this, body = self.qs('body', document);
			this.compileHTML(this.video, function(err, videoHTML) {
				var media = self.str2DOMElement(videoHTML);
				body.insertBefore(media, body.firstChild);
				self.addEventListener(media, 'playing', function() {
					self.applyCSS({ 
						'.landing .video-overlay, .landing video': {
							transparent: 1
						}
					}, true);
				});
				// media.load();
				// media.play();
			});
		}
	}]
})();

absurd.component('LandingLogo', {
	html: '.landing .logo',
	ready: ['is', function(is) {
		if(is.appended()) {
			this.applyCSS({
				moveto: '0/0'
			});
		}
	}]
})();

absurd.component('Sections', {
	html: '.landing',
	switchTo: function(newSection) {
		this.current && this.removeClass('selected', this.current);
		this.addClass('waiting', this[newSection]);
		this.delay(200, function() {
			this.removeClass('waiting', this[newSection]);
			this.addClass('selected', this[newSection]);
			this.current = this[newSection];
		});
	},
	ready: ['is, router', function(is, router) {
		if(is.appended()) {

			this.populate();

			// sections
			this.home = this.qs('.home');
			this.superpowers = this.qs('.superpowers');
			this.contribute = this.qs('.contribute');
			this.author = this.qs('.author');
			this.testing = this.qs('.testing');

			// routes
			router
			.add(/contribute/, function() {
				this.switchTo('contribute');
			})
			.add(/author/, function() {
				this.switchTo('author');
			})
			.add(/superpowers/, function() {
				this.switchTo('superpowers');
			})
			.add(/testing/, function() {
				this.switchTo('testing');
			})
			.add(function() {
				this.switchTo('home');
			}).check().listen();

			// inner pages transition
			this.cover = this.qs('.cover');
			var links = this.qsa('[data-transition-link]'), self = this;
			for(var i=0; i<links.length; i++) {
				var link = links[i];
				(function(l) {
					var href = l.getAttribute('href');
					l.setAttribute('href', '#');
					self.addEventListener(l, 'click', function(e) {
						self.addClass('cover-open', self.cover);
						self.delay(1400, function() {
							window.location.href = href;
						})
					});
				})(link);
			}

		}
	}]
})();