var Techy = require('../lib/index');
var fs = require('fs');
var expect = require('expect.js');

var compare = function(root, desc) {
	it(desc, function(done) {
		Techy(root, false, function() {
			var exprected = fs.readFileSync(root + '/expected.html').toString('utf8').replace(/(\r|\n)/g, '');
			var actual = fs.readFileSync(root + '/page.html').toString('utf8').replace(/(\r|\n)/g, '');
			expect(exprected).to.be(actual);
			done();
		}, true);
	});
}

describe("Techy testing", function() {
	compare(__dirname + "/md-to-html", "should compile markdown file to HTML");
	compare(__dirname + "/with-layout", "should use layout");
	compare(__dirname + "/set-get", "should use get and set");
	compare(__dirname + "/custom-templates", "should use custom templates");
	compare(__dirname + "/custom-layout", "should use custom layout");
	compare(__dirname + "/custom-method", "should use a custom method");
});