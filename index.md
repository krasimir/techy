<% set('title', 'Techy - The geeky way of writing') %>

<div class="full-img"></div>

---

# Hello, I'm Techy

I love [Markdown](https://daringfireball.net/projects/markdown/) and I can turn it to a beautifully looking HTML layouts. I'm build and distributed as a [Node.js](http://nodejs.org) module. [Gulp.js](http://gulpjs.com/) and [AbsurdJS](http://absurdjs.com/) are the base which I'm staying on. If you don't want to use a database to store your content I can help you. Write everything in Markdown format and I'll convert it to HTML.

---

## The concept

In the content driven web site (like a blog for example) the writing should be really easy and fluent. Markdown language gives us the simplicity which we need. However, sometimes converting *.md* files to *.html* files is not enough. Techy is an instrument which uses Markdown as a base but also makes your pages programmable. For example:

	&lt;% set('username', 'Big Joe') %>

	# Article title

	> author: &lt;% get('name') %>

	Hello, my name is &lt;% get('username') %>. I'm a web developer.

is transformed to:

	&lt;h1 id="article-title">Article title&lt;/h1>
	&lt;blockquote>
	    &lt;p>author: Big Joe&lt;/p>
	&lt;/blockquote>
	&lt;p>Hello, my name is Big Joe. I'm a web developer.&lt;/p>

In other words, there are JavaScript expressions which you may write between `<%` and `%>` and basically fetch information based on other files in your codebase. For example generating a site map or showing the latest added Markdowns.

## Simple usage

Install Techy from the command line by running the following:

	npm install -g techy

Aaaand ... that's it. Create an empty directory and put your Markdown files inside. If you type `techy` in the same folder and press *Enter* you will see all the materials converted to HTML.

Techy is not only generating HTML markup. It puts your writings into a nicely formated layout.

---

Checkout the documentaiton [<i class="fa fa-book"></i> here](/techy/docs) or fork the Techy project [in <i class="fa fa-github"></i> GitHub](https://github.com/krasimir/techy).