module.exports = function(title) {
	var html = this.template('start.html', {
		title: title || 'Techy'
	});
	html += this.template('contentopen.html');
	html += this.template('menu.html');
	this.content = html;
}