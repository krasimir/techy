module.exports = function() {
	return this.template('disqus', {
		path: 'http://krasimir.github.io/techy/' + this.get('paths').self,
		self: this.get('paths').self
	})
}