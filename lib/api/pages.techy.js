module.exports = function(path, sortby) {

	var pages = [], all = this.get('info').pages;

	for(var i=0; i<all.length; i++) {

		var page = all[i];
		var pageFile = page.get('paths').self + '/' + page.get('paths').file;
		var draft = page.get('draft');
		var add = false;

		// filtering by path
		if(path) {
			if((typeof path == 'string' && pageFile.indexOf(path) >= 0) || pageFile.match(path)) {
				add = true;
			}
		} else {
			add = true;
		}

		// filtering by draft
		if(add && typeof draft !== 'undefined' && draft === 'yes') {
			add = false;
		}
		
		if(add) {
			pages.push(page);
		}
	}

	// sorting
	if(sortby) {
		var strToDate = function(str) {
			var d = new Date(str);
			return isNaN(d) ? false : d;
		}
		var tmp, a, b;
		for(var i=0; i<pages.length; i++) {
			for(var j=i; j<pages.length; j++) {
				a = pages[i]; 
				b = pages[j];
				if(strToDate(a.get(sortby)) != false && typeof a.get(sortby) == 'string') {
					if(strToDate(a.get(sortby)) > strToDate(b.get(sortby))) {
						tmp = a;
						pages[i] = b;
						pages[j] = tmp;
					}
				} else {
					if((a.get(sortby) > b.get(sortby)) || (typeof a.get(sortby) == 'undefined' || typeof b.get(sortby) == 'undefined')) {
						tmp = a;
						pages[i] = b;
						pages[j] = tmp;
					}
				}
			}
		}
		pages = pages.reverse();
	}

	return pages;
}