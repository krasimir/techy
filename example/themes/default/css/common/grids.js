module.exports = function(api) {
	var possibleChilds = ['div', 'section', 'article', 'p'];
	var maxColumns = 6;
	for(var i=2; i<=maxColumns; i++) {
		var styles = {};
		for(var j=0; j<possibleChilds.length; j++) {
			styles['.grid-' + i + '-' + possibleChilds[j]] = { grid: i + '/' + possibleChilds[j] };
			api.add(styles);
		}
	}
}