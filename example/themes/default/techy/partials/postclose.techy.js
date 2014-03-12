module.exports = function(title) {
	var html = this.template('contentclose.html'); 
	html += this.template('footer.html');
	html += this.template('end.html');
	this.content = html;
}