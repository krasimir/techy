var Techy = require('../lib/index');
var fs = require('fs');
var expect = require('expect.js');

var compare = function(root) {
	it("should compile markdown file to HTML", function(done) {
		Techy(root, false, function() {
			var exprected = fs.readFileSync(root + '/expected.html').toString('utf8').replace(/(\r|\n)/g, '');
			var actual = fs.readFileSync(root + '/page.html').toString('utf8').replace(/(\r|\n)/g, '');
			expect(exprected).to.be(actual);
			done();
		}, true);
	});
}

describe("Techy testing", function() {
	compare(__dirname + "/md-to-html");
	compare(__dirname + "/with-layout");
	compare(__dirname + "/set-get");
});