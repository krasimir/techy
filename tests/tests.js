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

var compare = function(root, desc, asserts, ops) {
	ops = ops || { noLogging: true };
	it(desc, function(done) {
		deleteFolderRecursive(root + '/public');
		if(!ops || !ops.preventThemeFolderDeletion) {
			deleteFolderRecursive(root + '/themes');
		}
		Techy(root, 'empty', function() {
			var exprected = fs.readFileSync(root + '/expected.html').toString('utf8').replace(/(\r|\n)/g, '');
			var actual = fs.readFileSync(root + '/dest/page.html').toString('utf8').replace(/(\r|\n)/g, '');
			expect(exprected).to.be(actual);
			if(asserts) {
				asserts(done);
			} else {
				done();
			}
		}, ops);
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
	compare(__dirname + "/css_absurd", "should use Absurd", function(done) {
		var exprectedCSS = fs.readFileSync(__dirname + '/css_absurd/expected_styles.css').toString('utf8').replace(/(\r|\n)/g, '');
		var actualCSS = fs.readFileSync(__dirname + '/css_absurd/dest/public/styles.css').toString('utf8').replace(/(\r|\n)/g, '');
		expect(exprectedCSS).to.be(actualCSS);
		done();
	});
	compare(__dirname + "/css_less", "should use LESS", function(done) {
		var exprectedCSS = fs.readFileSync(__dirname + '/css_less/expected_styles.css').toString('utf8').replace(/(\r|\n)/g, '');
		var actualCSS = fs.readFileSync(__dirname + '/css_less/dest/public/styling.css').toString('utf8').replace(/(\r|\n)/g, '');
		expect(exprectedCSS).to.be(actualCSS);
		done();
	});
	// the test is commented because gulp-sass can not be installed properly at the moment
	// compare(__dirname + "/css_sass", "should use SASS", function(done) {
	// 	var exprectedCSS = fs.readFileSync(__dirname + '/css_sass/expected_styles.css').toString('utf8').replace(/(\r|\n)/g, '');
	// 	var actualCSS = fs.readFileSync(__dirname + '/css_sass/themes/empty/public/styling.css').toString('utf8').replace(/(\r|\n)/g, '');
	// 	expect(exprectedCSS).to.be(actualCSS);
	// 	done();
	// });
	compare(__dirname + "/css_css", "should use plain css", function(done) {
		var exprectedCSS = fs.readFileSync(__dirname + '/css_css/expected_styles.css').toString('utf8').replace(/(\r|\n)/g, '');
		var actualCSS = fs.readFileSync(__dirname + '/css_css/dest/public/styles.css').toString('utf8').replace(/(\r|\n)/g, '');
		expect(exprectedCSS).to.be(actualCSS);
		done();
	});
	compare(__dirname + "/master-config-TechyFile.js", "should use a master config with TechyFile.js");
	compare(__dirname + "/using-yaml", "should use yaml");
	compare(__dirname + "/process-other-files", "should process other type of files", function(done) {
		var actual = fs.readFileSync(__dirname + "/process-other-files/A/C/styles.css").toString('utf8');
		var expected = fs.readFileSync(__dirname + "/process-other-files/A/C/styles.css.expected").toString('utf8');
		expect(actual).to.be(expected);
		actual = fs.readFileSync(__dirname + "/process-other-files/A/custom.html").toString('utf8');
		expected = fs.readFileSync(__dirname + "/process-other-files/A/custom.html.expected").toString('utf8');
		expect(actual).to.be(expected);
		done();
	});
	compare(__dirname + "/using-none-as-layout", "should use none as layout");
	compare(__dirname + "/markdown-partials", "should use markdown as partial", function(done) {
		expect(fs.existsSync(__dirname + '/markdown-partials/A.html')).to.equal(false);
		expect(fs.existsSync(__dirname + '/markdown-partials/B.html')).to.equal(false);
		expect(fs.existsSync(__dirname + '/markdown-partials/C.html')).to.equal(true);
		done();
	});
	compare(__dirname + "/get-pages-from-dir", "should get pages from specific directory");
	compare(__dirname + "/sort-by", "should get pages from specific directory sorted");
	compare(__dirname + "/draft-pages", "pages should not return those which have draft: yes");
	compare(__dirname + "/custom-master-config", "techy should use custom master config", null, { noLogging: true, techyFile: __dirname + '/custom-master-config/options.js' });
	compare(__dirname + "/master-config-theme", "pages should use master config in the theme folder", null, { noLogging: true, preventThemeFolderDeletion: true});
	compare(__dirname + "/should-use-src-dest", "should use src and dest params", function(done) {
		expect(fs.existsSync(__dirname + '/should-use-src-dest/dest/public/styles.css')).to.equal(true);
		expect(fs.existsSync(__dirname + '/should-use-src-dest/dest/public/styles.css')).to.equal(true);
		expect(fs.readFileSync(__dirname + '/should-use-src-dest/dest/A.html').toString('utf8')).to.equal('<h1 id="hello-world">Hello World</h1>\n');
		done();
	}, { noLogging: true, preventThemeFolderDeletion: true, src: __dirname + '/should-use-src-dest/pages/src', dest: __dirname + '/should-use-src-dest/dest'});
	compare(__dirname + "/template-look-in-src", "template function should look into the src dir", function(done) {
		
		done();
	}, { noLogging: true, src: __dirname + '/template-look-in-src/pages'});
});