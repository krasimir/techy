<% set('layout', 'layouts/techy') %>
<% set('title', 'Techy / Documentation') %>

# Documentation<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Techy's home page](/techy)</small>

---

.grid

* [Theming](#theming)
	* [Layout](#layout)
	* [CSS](#css)
	* [JavaScript](#javascript)
	* [Templates](#templates)
* [API](#api)

.

---

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