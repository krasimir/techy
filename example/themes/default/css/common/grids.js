module.exports = function(api) {
	var possibleChilds = ['p'];
	var maxColumns = 6;
	for(var i=2; i<=maxColumns; i++) {
		var styles = {};
		for(var j=0; j<possibleChilds.length; j++) {
			styles['.grid-' + i] = { grid: i + '/' + possibleChilds[j] };
			api.add(styles);
		}
	}
}