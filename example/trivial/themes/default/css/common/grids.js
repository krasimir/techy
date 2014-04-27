module.exports = function(api) {
	var settings = api.settings.layouts.techy;
	var grids = [
		{ breakpoint: 600, cols: 2 },
		{ breakpoint: 670, cols: 3 },
		{ breakpoint: 700, cols: 4 }
	];
	for(var i=0; i<grids.length; i++) {
		var styles = {};
		styles['.grid-' + grids[i].cols] = { 
			grid: grids[i].cols + '/.grid-column',
			'.grid-column': {
				p: {
					pl: 0,
					pd: 0
				}
			}
		};
		styles['.grid-' + grids[i].cols]['@media all and (max-width: ' + grids[i].breakpoint + 'px)'] = {
			'.grid-column': {
				fl: 'n',
				wid: '100%'
			}
		}
		api.add(styles);
	}
}