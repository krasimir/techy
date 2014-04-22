module.exports = function(path, sortby) {

	var pages = [], all = this.get('info').pages;

	// filtering	
	if(path) {
		for(var i=0; i<all.length; i++) {
			var pageFile = all[i].get('paths').self + '/' + all[i].get('paths').file;
			if(
				(typeof path == 'string' && 
				pageFile.indexOf(path) >= 0) ||
				pageFile.match(path)
			) {
				pages.push(all[i]);
			}
		}
	} else {
		pages = all;
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
					if(a.get(sortby) > b.get(sortby)) {
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