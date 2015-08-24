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

var run = function(root, desc, asserts, ops, addToTechyCb) {
	ops = ops || { noLogging: true };
	addToTechyCb = addToTechyCb || function(){};
	it(desc, function(done) {
		deleteFolderRecursive(root + '/_dist');
		Techy(root, function() {
			addToTechyCb.call(this);
			if(asserts) {
				asserts(done);
			} else {
				done();
			}
		}, ops);
	});
}

var compareFileContent = function(a, b, ignoreNewLinesAndTabs) {
	if(ignoreNewLinesAndTabs) {
		expect(fs.readFileSync(a).toString().replace(/\n|\r|\t/g, '')).to.be(fs.readFileSync(b).toString().replace(/\n|\r|\t/g, ''));
	} else {
		expect(fs.readFileSync(a).toString()).to.be(fs.readFileSync(b).toString());
	}
}

var compare = function(root, desc, ops) {
	run(root, desc, function(done) {
		compareFileContent(root + '/_dist/page.html', root + '/expected.html');
		done();
	}, ops);
}

describe("Techy testing", function() {
	run(__dirname + "/basic", "should work properly", function(done) {
		expect(fs.existsSync(__dirname + '/basic/_dist/css/styles.css')).to.be(true);
		expect(fs.existsSync(__dirname + '/basic/_dist/js/scripts.js')).to.be(true);
		expect(fs.existsSync(__dirname + '/basic/_dist/inner/A.html')).to.be(true);
		expect(fs.existsSync(__dirname + '/basic/_dist/inner/A.md')).to.be(false);
		compareFileContent(__dirname + '/basic/_dist/inner/A.html', __dirname + '/basic/_expects/A.html');
		compareFileContent(__dirname + '/basic/_dist/page.html', __dirname + '/basic/_expects/page.html');
		done();
	});
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
	compare(__dirname + "/linkto", "should use linkto");
	run(__dirname + "/css_absurd", "should use Absurd", function(done) {
		compareFileContent(__dirname + '/css_absurd/expected_styles.css', __dirname + '/css_absurd/_dist/css/styles.css');
		done();
	});
	run(__dirname + "/css_less", "should use LESS", function(done) {
		compareFileContent(__dirname + '/css_less/expected_styles.css', __dirname + '/css_less/_dist/css/styling.css');
		done();
	});
	// // the test is commented because gulp-sass can not be installed properly at the moment
	// // compare(__dirname + "/css_sass", "should use SASS", function(done) {
	// // 	var exprectedCSS = fs.readFileSync(__dirname + '/css_sass/expected_styles.css').toString('utf8').replace(/(\r|\n)/g, '');
	// // 	var actualCSS = fs.readFileSync(__dirname + '/css_sass/themes/empty/public/styling.css').toString('utf8').replace(/(\r|\n)/g, '');
	// // 	expect(exprectedCSS).to.be(actualCSS);
	// // 	done();
	// // });
	run(__dirname + "/css_css", "should use plain css", function(done) {
		compareFileContent(__dirname + '/css_css/expected_styles.css', __dirname + '/css_css/_dist/css/styles.css', true);
		done();
	});
	compare(__dirname + "/using-yaml", "should use yaml");
	run(__dirname + "/process-other-files", "should process other type of files", function(done) {
		compareFileContent(__dirname + "/process-other-files/_dist/A/C/styles.css", __dirname + "/process-other-files/_dist/A/C/styles.css.expected", true);
		compareFileContent(__dirname + "/process-other-files/_dist/A/custom.html", __dirname + "/process-other-files/_dist/A/custom.html.expected", true);
		done();
	});
	compare(__dirname + "/markdown-partials", "should use markdown as partial", function(done) {
		expect(fs.existsSync(__dirname + '/markdown-partials/A.html')).to.equal(false);
		expect(fs.existsSync(__dirname + '/markdown-partials/B.html')).to.equal(false);
		expect(fs.existsSync(__dirname + '/markdown-partials/C.html')).to.equal(true);
		done();
	});
	compare(__dirname + "/get-pages-from-dir", "should get pages from specific directory");
	compare(__dirname + "/sort-by", "should get pages from specific directory sorted");
	compare(__dirname + "/draft-pages", "pages should not return those which have draft: yes");
	compare(__dirname + "/custom-master-config", "techy should use custom master config", { noLogging: true, techyFile: __dirname + '/custom-master-config/options.js' });
	run(__dirname + "/should-use-src-dest", "should use src and dest params", function(done) {
		expect(fs.existsSync(__dirname + '/should-use-src-dest/_out/A.html')).to.equal(true);
		expect(fs.existsSync(__dirname + '/should-use-src-dest/_out/page.html')).to.equal(true);
		expect(fs.readFileSync(__dirname + '/should-use-src-dest/_out/A.html').toString('utf8')).to.equal('<h1 id="hello-world">Hello World</h1>\n');
		done();
	}, { noLogging: true, src: __dirname + '/should-use-src-dest/_pages/src', dest: __dirname + '/should-use-src-dest/_out'});
	run(__dirname + "/master-config-with-dest-folder", "should put the public folder properly", function(done) {
		expect(fs.readFileSync(__dirname + '/master-config-with-dest-folder/_out/page.html').toString('utf8')).to.equal('<h1 id="hello-world">Hello world</h1>\n');
		done();
	}, { noLogging: true });
	run(__dirname + "/js", "should concatenates JavaScript", function(done) {
		compareFileContent(__dirname + "/js/expected.js", __dirname + "/js/_dist/public/js/file.js");
		done();
	}, { noLogging: true });
	run(__dirname + "/copy-non-underscore", "should copy only non-underscore folders", function(done) {
		var path = __dirname + "/copy-non-underscore/";
		expect(fs.existsSync(path + '_dist/copythis/somefile.txt')).to.equal(true);
		expect(fs.existsSync(path + '_dist/copythis/_copyme.html')).to.equal(true);
		expect(fs.existsSync(path + '_dist/copythis/_butnotthis')).to.equal(false);
		expect(fs.existsSync(path + '_dist/page.html')).to.equal(true);
		done();
	}, { noLogging: true });

	context("Watch files", function()
	{
		this.timeout(5000); // need to use some setTimeouts
		var lessWatchCb = function(){};
		after(function()
		{
			lessWatchCb();
		});

		run(__dirname + "/css_less_watch_dir", "should watch LESS directory", function(done)
		{
			// first: test imports
			compareFileContent(__dirname + '/css_less_watch_dir/expected_style.css', __dirname + '/css_less_watch_dir/_dist/css/style.css');
			// second: test watch changes
			setTimeout(function()
			{ 
				var imported1File = __dirname + '/css_less_watch_dir/_less/include/other.less',
					imported2File = __dirname + '/css_less_watch_dir/_less/other.less',
					imported1Contents = fs.readFileSync( imported1File ).toString('utf8').replace(/(\r|\n)/g, ''),
					imported2Contents = fs.readFileSync( imported2File ).toString('utf8').replace(/(\r|\n)/g, ''),
					imported1 = fs.openSync( imported1File, 'w+'), 
					imported2 = fs.openSync( imported2File, 'w+');

				// set files back to original contents;
				lessWatchCb = function()
				{
					fs.writeSync(imported1, imported1Contents, 0);
					fs.writeSync(imported2, imported2Contents, 0);
				};
				// write new values in the included files
				fs.writeSync(imported1, "@color1: #000000;");
				fs.writeSync(imported2, "@color2: #ffffff;");
				// check new values applied to new compiled style
				setTimeout(function()
				{
					compareFileContent(__dirname + '/css_less_watch_dir/expected_style_changed.css', __dirname + '/css_less_watch_dir/_dist/css/style.css');
					done();
				}, 200);
			}, 100);
		}, { noLogging: true }, function(){ this.watchFiles(); });
	});
});