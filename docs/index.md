<% set('title', 'Techy / Documentation') %>

# Documentation<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Techy's home page](/techy)</small>

---

.grid

* [How it works](#how-it-works)
* [Theming](#theming)
	* [Layout](#layout)
	* [CSS](#css)
	* [JavaScript](#javascript)
	* [Templates](#templates)
	* [Writing HTML](#writing-html)
	* [Accessing another page](#accessing-another-page)
	* [Master config](#master-config)
	* [Writing your own functions](#writing-your-own-functions)
* [API](#api)

.

---

## How it works

First, Techy checks the current selected theme. It then converts your Markdown file to HTML. Gets the layout from the `tpl` directory and replaces `&lt;% get('content') %>` with your content. It also executes the expressions in the code. They work on both places - Markdown or HTML. Like for example, `&lt;% get('paths').root %>` in the `basic.html` is replaced with an emptry string. That's because `page.md` is located in the root of the project. If it is a file in nested folder then the path will be set properly.

<div class="how-it-works-img"></div>

## Theming

Once you run `techy` you get a `themes` folder copied. It's located in the same directory which you run the command at. There are few themes available. The `default` theme is used if you run Techy without any parameter. To specify another one:

	techy --theme [name of your theme]

### Layout

The layout is HTML file which contains the placeholder for the content coming from your Markdown files. You are able to specify a different layout by using the following expression:

	&lt;% set('layout', 'layouts/custom-layout.html') %> 

The available layouts are placed in `/themes/[your theme]/tpl/layouts`. The default layout is `empty.html` and it contains only the placeholder. I.e.:

	&lt;% get('content') %>

If you create a `/themes/[your theme]/tpl/layouts/custom-layout.html` file with the following content:

	&lt;div class="content">
		&lt;% get('content') %>
	&lt;/div>

And use it with the following Markdown:

	&lt;% set('layout', 'layouts/custom-layout.html') %>

	# Some title

	some text

You will get:

	&lt;div class="content">
		&lt;h1>Some tilte&lt;/h1>
		&lt;p>some text&lt;/p>
	&lt;/div>

### CSS

The CSS styles in Techy are written with [AbsurdJS](http://absurdjs.com/pages/css-preprocessing/). The main file is `/themes/[your theme]/css/styles.js`. The final, compiled styles are saved in `/themes/[your theme]/public/styles.css` and that's the file that should be used in the layouts.

### JavaScript

Techy uses *gulp-concat* and *gulp-uglify* to produce the JavaScript needed for the pages. Just put your scripts in `/themes/[your theme]/js` directory and they will be merged into `/themes/[your theme]/public/scripts.js`

### Templates

No matter what you do you will need some kind of partial system. I.e. save a piece of code and inject it in several places. For such cases Techy provides the `template` method. The function searches for templates in `/themes/[your theme]/tpl` directory. For example:

	&lt;% template('footer.html') %>

Will check for `/themes/[your theme]/tpl/footer.html` or just for `/footer.html` and if it finds the file will import its content.

### Writing HTML

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

### Accessing another page

By using `&lt; set('key', 'value') %>` you are basically creating a variable for the current page. If you give it a name you are able to access all its properties from the other pages. For example:

	// A.md
	&lt;% set('name', 'PageA') %>
	&lt;% set('numOfProducts', 42) %>

	// B.md
	There are &lt;% page('PageA').get('numOfProducts') %> products in total.

### Master config

There is a way to define variables which will be available for all the pages. Create a file `Techy.js` in the main project's directory. Here is an example:

	// Techy.js
	module.exports = function() {
		return {
			globalSetting: 'I\'m a global'
		}
	}

	// page.md
	The value of the global setting is &lt;% globalSetting %>.

The function that is exported should return an object. The properties of that object are defined as global variables in your pages.

### Writing your own functions

Every JavaScript file which ends on `techy.js` is considered as a Techy function. For example:

	// myown.techy.js
	module.exports = function() {
		return 'My Name is ' + this.get('username');
	}

	// page.md
	&lt;% set('username', 'John') %>
	Hi, how are you &lt;% myown() %>!

`this` keyword inside the function points to the page. So, all the methods which you normally use in the Markdown file are available.

---

## API

Here is a list with all the build-in methods which you can use.

<!-- ---------------------------------- set -->

.grid grid-2

.grid-column

> set(key, value)

It sets a variable to the current page. There are few special keys which you may use:

* layout - sets the layout of the page
* date - sets the page's publish date

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

> page(page)

Get an access to all the pages in the project. Returns an array.

.

.grid-column

	// page.md
	&lt;% pages().length %>
.

.

---

<% template('social') %>
<% template('footer') %>
<% template('ga') %>