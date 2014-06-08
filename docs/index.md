---
title: Techy / Documentation
layout: _tpl/layouts/basic
---

# Documentation<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Techy's home page](../)</small>

---

.grid

* [How it works](#how-it-works)
* [Input and Output](#input-and-output)
* [Theming](#theming)
	* [Layout](#layout)
	* [CSS](#css)
	* [JavaScript](#javascript)
	* [Templates](#templates)
* [Writing HTML](#writing-html)
* [Accessing another page](#accessing-another-page)
* [Master config](#master-config)
* [Writing your own functions](#writing-your-own-functions)
* [Using Yaml Front Matter](#using-yaml-front-matter)
* [Using Techy in Node.js script](#using-techy-in-node-js-script)
* [Process non-markdown files](#process-non-markdown-files)
* Examples
	* [RSS reneration](../examples/rss-generation)
	* [Use Techy as Gulp plugin](../examples/gulp-plugin)
* [API](#api)
* [Contribute](./contribute.html)

.

---

## How it works

There are several steps that Techy goes through.

.grid

* If you use themes it copies the necessary files and directories for the basic look of your site (`_tpl` and `_dist/public`)
* Compiling/Concatenating CSS 
* Compiling/Concatenating the JavaScript
* Searching for Markdowns and converting them to a beautifully looking web pages
* Copying all the folders that are non underscore prefixed to the destination directory (by default `_dist`).

.

If set the `layout` varialbe, Techy reads the file and replaces `&lt;% get('content') %>` with your content. It also executes the expressions in the code. There are bunch of features that you may use. Like for example importing partials or executing your own methods. 

By default Techy doesn't provide any visual look of your markdown files. But if you want to have one use `techy --theme default` which will place the needed files in your `_dist` directory. After that you have to set `layout: _tpl/layout.html` in your markdowns in order to get the default HTML markup applied.

## Input and Output

There are several arguments that you can pass to Techy. Two of them are `--src` and `--dest`. By the default the source directory is the one which you run the `techy` command from. The destination of the compiled files is by default set to `_dist` directory. All the folders that start with underscore are not processed and they are not copied to the `_dist` directory. The others are duplicated there. Here is an short example. Let's say that we have the following file structure:

	/site
	  /_css
	  /_js
	  /_pages
	    /inner
	      /A.md
	      /B.md
	    /index.md
	  /_tpl
	  /public
	  	/img
	  	/fonts
	  	/...

If we run `techy --src ./_pages we will get:

	/site
	  /_css
	  /_js
	  /_pages
	    /inner
	      /A.md
	      /B.md
	    /index.md
	  /_tpl
	  /_dist
	    /inner
	       /A.html
	       /B.html
	    /public
	  		/img
	  		/fonts
	  		/...
	    /index.html
	  /public
	  	/img
	  	/fonts
	  	/...

The idea is that `_dist` folder contains the really final files which you need to upload on your server.	    

## Architecture

### Layout

The layout is HTML file that contains the placeholder for the content coming from your Markdown files. You are able to specify a different layout by using the following expression:

	&lt;% set('layout', 'layouts/custom-layout.html') %> 

or simly write the following at the top of the file:

	---
	layout: _tpl/_layouts/custom-layout.html
	---

If you create a `_tpl/layouts/custom-layout.html` file with the following content:

	&lt;div class="content">
		&lt;% get('content') %>
	&lt;/div>

And use it with the following Markdown:

	---
	layout: layouts/custom-layout.html
	---

	# Some title

	some text

You will get:

	&lt;div class="content">
		&lt;h1>Some tilte&lt;/h1>
		&lt;p>some text&lt;/p>
	&lt;/div>

### CSS

#### No CSS preprocessor, plain CSS files

The `index` property accepts glob pattern. All the files matching that pattern are concatenated.

	module.exports = function() {
		return {
			css: {
				preprocessor: 'none',
				index: '_css/**/*.css'
			}
		}
	}

#### AbsurdJS as CSS preprocessor

[`gulp-absurd`](https://github.com/krasimir/gulp-absurd) module is used.

	module.exports = function() {
		return {
			css: {
				preprocessor: 'absurd',
				index: '_css/absurd/styles.js'
			}
		}
	}

#### LESS as CSS preprocessor

[`gulp-less`](https://github.com/plus3network/gulp-less) module is used.

	module.exports = function() {
		return {
			css: {
				preprocessor: 'less',
				index: '_css/less/styles.less'
			}
		}
	}

You need to install `gulp-less` for the current project to get this working. So, simply run `npm install gulp-less`.

#### SASS as CSS preprocessor

[`gulp-sass`](https://github.com/dlmanning/gulp-sass) module is used.

	module.exports = function() {
		return {
			css: {
				preprocessor: 'sass',
				index: '_css/sass/*.scss'
			}
		}
	}

You need to install `gulp-sass` for the current project to get this working. So, simply run `npm install gulp-sass`.

### JavaScript

Techy uses *gulp-concat* to produce the JavaScript needed for the pages. You should define the JavaScript preferences in your `TechyFile.js`.

	module.exports = function() {
		return {
			js: {
				src: '_src/js/**/*.js',
				dest: '_dist/public/myscripts.js'
			}
		}
	}

### Templates

No matter what you do you will need some partial system. I.e. save a piece of code and inject it in several places. For such cases, Techy provides the `template` method. For example:

	&lt;% template('footer.html') %>

Will check for `/footer.html` in the root directory and if it finds the file will import its content.

## Writing HTML

You may need to add a valid HTML markup to the page. But at the same time continue writing Markdown between your tags. Here is a limited feature that you could use.

.grid grid-2

.grid-column code-left

The following code:

	.foo bar

	Sample text here.

	.

.

.grid-column

Is converted to

	&lt;div class="foo bar">
		&lt;p>Sample text here.&lt;/p>
	&lt;/div>

.

.

## Accessing another page

By using `&lt;% set('key', 'value') %>` you are basically creating a variable for the current page. If you give it a name, you are able to access all its properties from the other pages. For example:

	// A.md
	&lt;% set('name', 'PageA') %>
	&lt;% set('numOfProducts', 42) %>

	// B.md
	There are &lt;% page('PageA').get('numOfProducts') %> products in total.

If you need to get all the pages you could use [`pages`](#api) method.

## Master config

There is a way to define variables that will be available for all the pages. Create a file `TechyFile.js` in the main project's directory. Here is an example:

	// TechyFile.js
	module.exports = function() {
		return {
			globalSetting: 'I\'m a global'
		}
	}

	// page.md
	The value of the global setting is &lt;% globalSetting %>.

The function that is exported should return an object. The properties of that object are defined as global variables in your pages. If you don't want to use a file with name `TechyFile.js` you may pass `--config`
parameter. Like for example

	techy --config ./options.js

There are few properties which have special meaning. 

.grid

* `css` - it defines the used CSS preprocessor. Read more about this [here](#css).
* `js` - it defines the JavaScript preferences. Read more about this [here](#javascript).
* `process` - gives you ability to process non-markdown files. More info [here](#process-non-markdown-files).
* `src` - the source Markdown files for compilation
* `dest` - the output directory

.

## Writing your own functions

Every JavaScript file which ends on `techy.js` is considered as a Techy function. For example:

	// myown.techy.js
	module.exports = function() {
		return 'My Name is ' + this.get('username');
	}

	// page.md
	&lt;% set('username', 'John') %>
	Hi, how are you &lt;% myown() %>!

`this` keyword inside the function points to the page. So, all the methods which you normally use in the Markdown file are available.

## Using Yaml Front Matter

If you ever used [Jekyll](http://jekyllrb.com/) you are probably familiar with [Yaml Front Matter](http://jekyllrb.com/docs/frontmatter/). It gives you the ability to define settings for the current page. All you have to do is to put some Yaml in the beginning of the file wrapped in `---`. For example:

	---
	username: Derek Worthen
	age: young
	contact: 
	 email: email@domain.com
	 address: some location
	pets: 
	 - cats
	 - dogs
	 - bats
	match: !!js/regexp /pattern/gim
	run: !!js/function function(a) { return a.toUpperCase(); }
	---

	# Hello world

	Hello, my name is &lt;% get('username') %>.
	My address is &lt;% get('contact').address %>.
	I love &lt;% get('run')(get('pets')[1]) %>.

The rows in the beginning are translated to the following JSON:

	{ 
		username: 'Derek Worthen',
		age: 'young',
		contact: { email: 'email@domain.com', address: 'some location' },
		pets: [ 'cats', 'dogs', 'bats' ],
		match: /pattern/gim,
		run: function(a) { return a.toUpperCase(); }
	}

And later all the properties of the above object are set as properties of the current page. That's the result:

	&lt;h1 id="hello-world">Hello world&lt;/h1>
	&lt;p>
		Hello, my name is Derek Worthen. 
		My address is some location.
		I love DOGS.
	&lt;/p>

## Using Techy in Node.js script

Add `techy` to your dependencies in the `package.json` file. After that simply initialize the module. For example:

	var Techy = require('techy');
	Techy(__dirname + '/docs', function() {
		this.watchFiles();
	}, { myprop: 'my value' });

`__dirname + '/docs'` is the directory which you want to be processed by Techy.

The second parameter is a function which is called once the module finishes its initial compilation. It's called with the context of the main's Techy class and there are few functions which you may use:

.grid

* `watchFiles`
* `compilePages`
* `compileCSS`
* `compileJS`

.

The object which you pass after that callback is the [master configuration](#master-config) object.

## Process non-markdown files

The library could process not only Markdown, but any other file. However, you should describe these files in the [`TechyFile.js`](#master-config) file. The rule is that Techy removes the extension of your file and saves a new one with the new content. For example:

	header.css.techy -> header.css
	my-awesome.styles.css.blah -> my-awesome.styles.css
	scripts.js.tttt -> scripts.js

Here is an example how `TechyFile.js` may look like:

	module.exports = function() {
		return {
			process: [
				'**/*.techy',
				'B/*.blah',
				'A/**/styles.css.ttt'
			]
		}
	}

The trick is to set an array of Glob patters to `process` property.

---

<!------------------------------------------------------------------------------------------ -->
<!------------------------------------------------------------------------------------------ -->
<!------------------------------------------------------------------------------------  API  -->
<!------------------------------------------------------------------------------------------ -->
<!------------------------------------------------------------------------------------------ -->

## API

Here is a list with all the build-in methods which you can use.

<!-- ---------------------------------- set -->

.grid grid-2

.grid-column

> set(key, value)

It sets a variable to the current page. There are few special keys which you may use:

* layout - sets the layout of the page (use `none` for no layout)
* date - sets the page's publish date
* noSave - prevent Techy from saving the file (valid values `true` or `false`)

.

.grid-column

	&lt;% set('title', 'The page title') %>
	&lt;% set('layout', 'layouts/basic') %>
	// day-month-year
	&lt;% set('date', '22-02-2014') %>

.

.

<!-- ---------------------------------- get --> 

.grid grid-2

.grid-column

> get(key)

Gets a variable initialized with `set` function.

.

.grid-column

	The title is &lt;% get('title') %>.

.

.

<!-- ---------------------------------- template --> 

.grid grid-2

.grid-column

> numofpages()

Returns the number of the pages.

.

.grid-column

	There are &lt;% numofpages() %> pages.

.

.

<!-- ---------------------------------- template --> 

.grid grid-2

.grid-column

> template(file, data)

Injects a HTML content. The second parameter is an hash object. Data which is applied to the template.

.

.grid-column

	// tpl/partials/footer.html
	&lt;div class="footer">
		&lt;p>&lt;% footerText %>&lt;/p>
	&lt;/footer>

	// index.md
	&lt;% template('partials/footer', { footerText: 'sample text' }) %>

.

.

<!-- ---------------------------------- linkto --> 

.grid grid-2

.grid-column

> linkto(page)

Get a path to specific page

.

.grid-column

	// inner/A/B/page.md
	&lt;% set('name', 'MyPage') %>

	// index.md
	&lt;a href="&lt;% linkto('MyPage') %>">page&lt;/a>

	// resulted index.html
	&lt;a href="inner/A/B/page.html">page&lt;/a>

.

.

<!-- ---------------------------------- page --> 

.grid grid-2

.grid-column

> page(page)

Get an access to another page

.

.grid-column

	// A.md
	&lt;% set('name', 'MyPage') %>
	&lt;% set('somethingCustom', 'value') %>

	// B.md
	&lt;% page('MyPage').get('somethingCustom') %>
.

.

<!-- ---------------------------------- pages --> 

.grid grid-2

.grid-column

> pages(filter, sortby)

Get an access to all the pages in the project. Returns an array. The method doesn't return the pages which have `draft` property set to `yes`.

.

.grid-column

	// all the pages
	&lt;% pages() %>

	// all the pages in specific directory
	&lt;% pages('articles/js') %>

	// all the pages matching regex
	&lt;% pages(/article\.(js|html)/) %>

	// sorting by `date` property
	&lt;% pages(null, 'date') %>
	
.

.

---

<% template('social') %>
<% template('footer') %>
<% template('ga') %>
<% template('ribbon') %>