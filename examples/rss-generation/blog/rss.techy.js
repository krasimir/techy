module.exports = function() {
	var rss = '',
		pages = this.pages();
    for(var i=0; i<pages.length, page=pages[i]; i++) {
    	var url = page.get('paths').self + '/' + page.get('paths').file;
    	rss += '\n<item>';
    	rss += '<title>' + page.get('title') + '</title>';
		rss += '<link>' + url + '</link>';
		rss += '</item>';
    }
    return rss;
}