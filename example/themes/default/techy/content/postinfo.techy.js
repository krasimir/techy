var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
module.exports = function(file, data) {
	var d = this.get('date'), dateStr = '';
	if(d) {
		var date = new Date(d.year, d.month, d.date);
		if(date) {
			dateStr = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		}
	}
	return this.template('partials/postinfo', {
		date: dateStr,
		tags: this.get('tags') || [],
		tagURL: (data && data.tagURL) || '/filter/'
	});
}