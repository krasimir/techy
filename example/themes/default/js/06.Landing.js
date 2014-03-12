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