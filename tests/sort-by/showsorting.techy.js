module.exports = function() {
	var appendStr = function(pages, title) {
		var str = '<h2>' + title + '</h2><p>\n';
		for(var i=0; i<pages.length; i++) {
			var p = pages[i];
			str += '<br />\ndate=' + p.get('date') + ' value=' + p.get('value');
			str += ' ' + p.get('paths').file;
		}
		str += '</p>';
		return str;
	}
	return appendStr(this.pages(null, 'date'), 'By date') + 
	appendStr(this.pages(null, 'value'), 'By value') + 
	appendStr(this.pages('today', 'value'), 'today by value') +
	appendStr(this.pages('articles', 'date'), 'articles by date');
}