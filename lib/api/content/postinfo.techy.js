var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var absurd = require('absurd')();
module.exports = function(data) {
	var d = this.get('date'), dateStr = '', res = '';
	if(d) {
		var date = new Date(d.year, d.month, d.date);
		if(date) {
			dateStr = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		}
	}
	absurd.morph('html').add({
		'div.post-info': {
			'p.date': '<% this.date %>',
			'p.tags': [
				'<% for(var i=0; i<this.tags.length; i++) { %>',
				'<a href="<% this.tagURL + this.tags[i].toLowerCase().replace(/ /g, "-") %>"><i class="fa fa-tags"></i> <% this.tags[i] %></a>',
				'<% } %>'
			]
		}
	}).compile(function(err, html) {
		res = html;
	}, {
		date: dateStr,
		tags: this.get('tags') || [],
		tagURL: (data && data.tagURL) || '/filter/'
	});
	return res;
}