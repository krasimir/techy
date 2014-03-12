module.exports = function(title) {
	this.content = this.template('start.html', {
		title: title || 'Techy'
	});
}