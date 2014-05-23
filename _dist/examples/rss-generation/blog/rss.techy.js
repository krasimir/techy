module.exports = function() {
	var rss = '',
		pages = this.pages();

    var sortByDate = function(page1, page2) {
        var strToDate = function(str) {
            var tmp = str.split('-');
            return new Date(tmp[2], tmp[1], tmp[0]);
        }
        return strToDate(page1.get('date')) < strToDate(page2.get('date'));
    }

    pages.sort(sortByDate);

    for(var i=0; i<pages.length, page=pages[i]; i++) {
    	rss += '\n<item>';
    	rss += '<title>' + page.get('title') + '</title>';
		rss += '<link>http://example.com/blog/' + page.get('paths').url + '</link>';
		rss += '</item>';
    }
    return rss;
}