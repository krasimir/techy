---
title: Techy / Contribute
layout: _tpl/layouts/basic
---

# Contribute<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Documentation](./)</small>

---

The following page aims to introduce you to the code of Techy. How it works and how it could be develop.

## Flow

The entry point of the module is `lib/index.js`. There is one main class called `Techy` which is exported. By default the class is immediately invoked by the following code:

	if(!module.parent) {
		Techy(false, false, function() {
			this.watchFiles();
		});
	}

There are few functions which are run one after each other in the following sequence:

.grid

* `copyingDefaultFiles` - copies the `_css`, `_js`, `_tpl` and `public` folders to the root of the project
* `setMasterConfig` - loads `TechyFile.js` file and reads the options inside
* `creatingDestFolder` - making the destination directory (`dist` by default)
* `compileCSS` - compiles the CSS to the `public` directory
* `compileJS` - compiles the JS to the `public` directory
* `compilePages` - fires compilation of the pages
* `copyingPublicFiles` - copies all the non underscore prefixed folders to the destination directory
* `watchFiles` - start watching for changes

.

There is a `lib/Factory.js` file. That's the file which contains the Gulp task which process the Markdowns. `processFile` function inside it is the one which accepts every of the files. An instance of `lib/Page.js` class is created per Markdown. All the pages need to know about each other so there is a function `getInfo` which perform a quick reading of the available pages. So, in practice Techy process every file twice. The first time is just to get the defined variables inside and second time to generate the HTML file.

## Defining build-in page methods

As we know there are some functions which we may use. Like for example `&lt;% page('somepage').get('name') %>`. In order to define our own methods we should:

.grid

* open `lib/Page.js` and attach something to the `api` object
* create a new file in `lib/api` (it's just a Node.js module which exports a function. That function is called in the context of the current page. So the `this` property is pointing to our page. The one which is processing at the moment)

.

## Editing default CSS

Techy by default uses plain CSS. It is in `lib/themes/default/_css`.

## Editing default JavaScript

It is in `lib/themes/default/_js`.

## Create your own theme

Just create a new directory in `lib/themes`. There should be four sub-folders - `_css`, `_js`, `public`, `_tpl`. Just use the `default` theme as a starting point.

## Running tests

The tests are written in [Mocha](http://visionmedia.github.io/mocha/). Just go to the main repository folder and run:

	mocha ./tests

---

<% template('social') %>
<% template('footer') %>
<% template('ga') %>
<% template('ribbon') %>