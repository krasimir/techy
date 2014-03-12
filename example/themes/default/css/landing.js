/************************************************************* Global */
var noVideoBreakpoint = '@media all and (max-width: 880px)';
var easing = 'cubic-bezier(1,.03,.19,.96)';
var themeColor = '#FF2227';

/************************************************************* Video */
var video = function() {
	var r = {
		video: {
			'-wmso-trs': 'all 2000ms',
			transparent: 0,
			bottom: 0,
			right: 0,
			zin: '-999',
			ov: 'h',
			pos: 'a',
			miw: '100%',
			mih: '100%',
			wid: 'auto',
			hei: 'auto'
		},
		'.video-overlay': {
			transparent: 0,
			'@media all and (max-width: 880px)': {
				d: 'n'
			},
			pos: 'a',
			miw: '100%',
			mih: '100%',
			wid: 'auto',
			hei: 'auto',
			bg: 'url(/public/img/landing-bg.png)'
		}
	};
	r.video[noVideoBreakpoint] = { d: 'n' };
	r['.video-overlay'][noVideoBreakpoint] = { d: 'n' };
	return r;
}

/************************************************************* Logo */
var logo = function() {
	var wid = 60;
	var r = {
		'.logo': {
			d: 'b',
			wid: wid + 'px',
			pos: 'a',
			left: '50%',
			bottom: '40px',
			ml: '-' + Math.ceil(wid/2) + 'px',
			moveto: '0/300px',
			transparent: 0.4,
			'-wmso-trs': 'all 1000ms',
			'&:hover': {
				scaleto: '1.2/1.2',
				transparent: 1
			}
		}
	}
	r['.logo'][noVideoBreakpoint] = {
		pos: 'r',
		wid: (wid * 2) + 'px',
		mar: '50px auto 50px auto',
		transparent: 1,
		moveto: '0/0',
		left: 'auto',
		bottom: 'auto',
		'&:hover': {
			scaleto: '1/1'
		}
	}
	return r;
}

/************************************************************* section */
var section = function() {
	var wid = 960;
	var r = {
		section: {
			pos: 'a',
			left: '-' + wid + 'px',
			top: '50%',
			ml: '-' + Math.ceil(wid/2) + 'px',
			mt: '-200px',
			wid: wid + 'px',
			'-wmso-trs': 'all 1400ms',
			'-wmso-trstf': easing,
			'&.text-section': {
				ta: 'c',
				h2: {
					ta: 'c',
					d: 'ib',
					bg: '#000',
					color: '#fff',
					pad: '20px 30px',
					fz: '60px',
					lh: '60px',
					mar: '0 0 20px 0'
				},
				'p, .paragraph': {
					bg: '#000',
					color: '#fff',
					pad: '20px',
					maw: '600px',
					m: 'au',
					a: {
						color: '#FFF',
						bdb: 'dotted 1px #fff',
						'-wmso-trs': 'all 300ms',
						'&:hover': {
							color: '#999'
						}
					}
				},
				'.close': {
					wid: '52px',
					m: 'au',
					fz: '60px',
					d: 'b',
					color: '#000',
					'-wmo-trf': 'translate(0, -60px) rotateZ(0deg) scale(0.9, 0.9)',
					'-wmo-transform-origin': '50% 30.5px',
					'-wmso-trs': 'all 600ms',
					'-wmso-trstf': easing,
					'&:hover': {
						bdb: 'n',
						color: themeColor,
						'-wmo-trf': 'translate(0, -60px) rotateZ(90deg) scale(1.5, 1.5)'
					}
				},
				iframe: {
					moveto: '7px/0'
				},
				'.nets': {
					mar: '10px 0 0 0',
					a: {
						d: 'ib',
						bdb: 'n'
					}
				}
			},
			'&.home': home(),
			'&.waiting': waitingSection(),
			'&.selected': selectedSection()
		}
	}
	r.section[noVideoBreakpoint] = {
		pos: 'r',
		left: 'auto',
		top: 'auto',
		mar: '30px auto',
		maw: '600px',
		wid: 'auto'
	};
	r.section['&.text-section']['.close'][noVideoBreakpoint] = {
		d: 'n'
	};
	r.section['&.text-section'].h2[noVideoBreakpoint] = {
		fz: '30px',
		bg: '#FFF',
		color: '#000',
		pad: '10px 0 10px 0'
	};
	return r;
}

/************************************************************* selected and waiting */
var selectedSection = function() {
	var r = {
		left: '50%'
	}
	r[noVideoBreakpoint] = {
		left: 'auto'
	}
	return r;
}
var waitingSection = function() {
	var r = {
		'-wmso-trs': 'none',
		left: '100%',
		ml: '0'
	}
	r[noVideoBreakpoint] = {
		left: 'auto'
	}
	return r;
}

/************************************************************* home */
var home = function() {
	var r = {
		grid: '2/.column',
		'.title': {
			ta: 'r',
			h1: {
				fz: '60px',
				lh: '50px',
				ta: 'r',
				d: 'i',
				bg: '#000',
				span: {
					pos: 'r',
					color: '#FFF'
				}
			}
		},
		'.links': {
			pad: '0 0 0 40px',
			moveto: '0/-10px',
			ul: {
				mar: 0,
				pad: 0,
				lis: 'n',
				li: {
					mar: '0 0 4px 0',
					pad: 0,
					a: {
						'-wmo-trs': 'all 200ms',
						d: 'ib',
						bg: '#000',
						pad: '10px 20px',
						color: '#FFF',
						bdl: 'solid 1px #000',
						'&:hover': {
							bdb: 'n',
							bdl: 'solid 13px ' + themeColor
						},
						'&.small': {
							fz: '12px',
							fw: 'n',
							pad: '4px 8px',
							bg: 'rgba(0, 0, 0, 0.6)'
						},
						'&.super-small': {
							fz: '10px',
							fw: 'n',
							pad: '2px 4px',
							bg: 'rgba(0, 0, 0, 0.4)'
						}
					}
				}
			}
		}
	}
	r['.column'] = {};
	r['.column'][noVideoBreakpoint] = { fl: 'n', wid: '100%', pad: 0 };
	r['.title'][noVideoBreakpoint] = { ta: 'c', mar: '0 0 36px 0', h1: { fz: '40px', lh: '40px'} };
	r['.links'].ul.li[noVideoBreakpoint] = { 
		ta: 'c',
		a: {
			'&:hover': {
				bdb: 'n',
				bdl: 'solid 1px #000'
			}
		}
	};
	return r;
}

/************************************************************* cover */
var cover = function() {
	var r = {
		'.cover': {
			pos: 'a',
			top: 0,
			left: 0,
			wid: '0',
			hei: '100%',
			zin: '1000',
			bg: '#FFF',
			'-wmso-trs': 'all 1200ms',
			'-wmso-trstf': 'cubic-bezier(1,.01,1,.52)',
			'&.cover-open': {
				wid: '100%'
			}
		}
	}
	return r;
}

/************************************************************* */
module.exports = function(api) {
	var basic = {
		bg: '#FFF',
		ov: 'h'
	}
	basic[noVideoBreakpoint] = {
		ov: 's'
	};
	var r = {
		'.landing': [
			basic,
			video(),
			logo(),
			section(),
			cover()
		]
	};
	api.add(r)
}