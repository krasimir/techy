var Techy = require('../lib/index');
var fs = require('fs');
var expect = require('expect.js');

var deleteFolderRecursive = function(path) {
	if(fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file,index){
			var curPath = path + "/" + file;
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};

var compare = function(root, desc) {
	it(desc, function(done) {
		deleteFolderRecursive(root + '/public');
		deleteFolderRecursive(root + '/themes');
		Techy(root, 'empty', function() {
			var exprected = fs.readFileSync(root + '/expected.html').toString('utf8').replace(/(\r|\n)/g, '');
			var actual = fs.readFileSync(root + '/page.html').toString('utf8').replace(/(\r|\n)/g, '');
			expect(exprected).to.be(actual);
			done();
		}, true);
		// done();
	});
	it("should have js and css compiled", function(done) {
		expect(fs.existsSync(root + '/themes/empty/public/scripts.js')).to.be.equal(true);
		expect(fs.existsSync(root + '/themes/empty/public/styles.css')).to.be.equal(true);
		done();
	});
}

describe("Techy testing", function() {
	compare(__dirname + "/md-to-html", "should compile markdown file to HTML");
	compare(__dirname + "/with-layout", "should use layout");
	compare(__dirname + "/set-get", "should use get and set");
	compare(__dirname + "/custom-templates", "should use custom templates");
	compare(__dirname + "/custom-layout", "should use custom layout");
	compare(__dirname + "/custom-method", "should use a custom method");
	compare(__dirname + "/num-of-pages", "should use numofpages method");
	compare(__dirname + "/using-path", "should use path method");
	compare(__dirname + "/access-page-by-name", "should get a page by name");
	compare(__dirname + "/master-config", "should use a master config");
	compare(__dirname + "/html-usage", "should use html");
	compare(__dirname + "/skip-node_modules", "should skip node_modules");
	compare(__dirname + "/linkto", "should use linkto");
});