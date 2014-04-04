# Hello, I'm Techy<br /><small>The geeky way of writing</small>

I'm a super simple Flat CMS based on [Node.js](http://nodejs.org) ([Gulp.js](http://gulpjs.com/) and [AbsurdJS](http://absurdjs.com/)). If you don't want to use a database to store your content I could help you. Write everything in [Markdown](https://daringfireball.net/projects/markdown/) format and I'll convert it to HTML.

## The concept

In the content driven web site (like a blog for example) the writing should be really easy. Markdown language gives us the simplicity which we need. However, sometimes converting *.md* files to *.html* files is not enough. Techy is an instrument which uses Markdown as a base but also makes your pages programmable. For example:

	<% set('name', 'Big Joe') %>

	# Article title

	> author: <% get('name') %>

	Hello, my name is <% get('name') %>. I'm a web developer.

is transformed to:

	<h1 id="article-title">Article title</h1>
	<blockquote>
	    <p>author: Big Joe</p>
	</blockquote>
	<p>Hello, my name is Big Joe. I'm a web developer.</p>

In other words, there are JavaScript expressions which you may write between `<%` and `%>` and basically fetch information based on other files in your codebase. For example generating a site map or showing the latest added Markdowns.

## Simple usage

Install Techy from the command line onto your system by running the following command:

	npm install -g techy

Aaaand ... that's it. Create an empty directory and put your Markdown files inside. If you type `techy` and press *Enter* in the same folder you will see all the materials coverted to HTML.

Techy is not only generating HTML markup. It puts your writings into a nicely formated layout.

---

Checkout the full documentaiton [here](/http://krasimir.github.io/techy/docs).