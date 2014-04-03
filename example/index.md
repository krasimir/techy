<% set('layout', 'layouts/techy') %>

# Hello, I'm Techy

I'm a super simple Flat CMS based on [Node.js](http://nodejs.org). I'm build with [Gulp.js](http://gulpjs.com/) and [AbsurdJS](http://absurdjs.com/). If you don't want to use a database to store your content I could help you. Write everything in [Markdown](https://daringfireball.net/projects/markdown/) format and I'll convert it to HTML.

<div class="full-img"></div>

## The concept

The content driven web site (like a blog for example) the writing should be really easy. Markdown language gives us the simplicity which we need. However, simply converting *.md* to *.html* files is not enough. Techy is an instrument which uses Markdown as a base but also makes your pages dynamic. For example:

	&lt;% set('name', 'Big Joe') %>

	# Article title

	> author: &lt;% get('name') %>

	Hello, my name is &lt;% get('name') %>. I'm a web developer.

is transformed to:

	&lt;h1 id="article-title">Article title&lt;/h1>
	&lt;blockquote>
	    &lt;p>author: Big Joe&lt;/p>
	&lt;/blockquote>
	&lt;p>Hello, my name is Big Joe. I'm a web developer.&lt;/p>

In other words there are few methods which you may use between `<%` and `%>`. Those methods make your Markdown file dynamic. You are actually able to wire your pages by composing content based on the data added as expressions.

The main idea of Techy is to be as simple as possible and stick to the usual Markdown format.

## Simple usage

It can't be so simple. Just install me onto your system by running the following command:

	npm install -g techy

Aaaand ... that's it. Create an empty directory and put your Markdown files inside. If you type `techy` and press *Enter* in the same folder I'll convert all the materials to HTML and will start listening for changes.

I'm not only generating HTML markup. I'm putting your writings into a nicely formated layout.

