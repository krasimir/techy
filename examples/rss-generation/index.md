---
title: Techy / RSS generation
---

# RSS generation<br /><small>[<i class="fa fa-arrow-circle-o-left"></i> Back to the documentation](/techy/docs)</small>

Using Techy as a blog platform leads to the need of RSS feed. And because every page is actually a separate object we are able to generate RSS pretty easily. Let's say that we have the following file structure:

	/blog
		/articles
			/A.md
			/B.md
			/C.md

The content of the Markdown files is as follows:

A.md

	---
	title: Article A
	date: 10-04-2014
	---

	# &lt;% get('title') %>

B.md

	---
	title: Article B
	date: 12-04-2014
	---

	# &lt;% get('title') %>

C.md

	---
	title: Article C
	date: 22-02-2014
	---

	# &lt;% get('title') %>

By using the [Yaml Front Matter](/techy/docs/#using-yaml-front-matter) we are defining `title` and `date` properties for every page.

If we go to the `blog` directory and run `techy` command we will get three new files - `A.html`, `B.html` and `C.html`. So far so good. We have our pages generated and the users are able to see them. Now, we need to write our RSS. Let's create a new file in the `blog` directory called `feed.xml.source`. It will act as a template for the final file. Its extension is not `.md` so Techy will not process it by default. We have to additionally point that out in the `TechyFile.js` of the project:

	// blog/TechyFile.js

	module.exports = function() {
		return {
			process: [
				'feed.xml.source'
			]
		}
	}

Running `techy` command again brings `feed.xml` file. The next step is to fetch all the pages in the blog and fill the xml with their titles and links. Here is how `feed.xml.source` may look like:

	&lt;?xml version="1.0"?>
	&lt;rss version="2.0">
	  &lt;channel>
	    &lt;title>Example Channel&lt;/title>
	    &lt;link>http://example.com&lt;/link>
	    &lt;description>My example channel&lt;/description>
	    &lt;% rss() %>
	  &lt;/channel>
	&lt;/rss>

The actual generation of the items is happening in a custom function `rss`. Techy gives you ability to write such functions and put whatever you need there. All you have to do is to create a file with the function's name ending on `techy.js` and the library will include it in the global scope. The good thing is that it is executed in the context of the current page so for example `this.get` or `this.set` are valid methods.

	// blog/rss.techy.js

	module.exports = function() {
		var rss = '',
			pages = this.pages();

	    var sortByDate = function(page1, page2) {
	        var strToDate = function(str) {
	            var tmp = str.split('-');
	            return new Date(tmp[2], tmp[1], tmp[0]);
	        }
	        return strToDate(page1.get('date')) < strToDate(page2.get('date'));
	    }

	    pages.sort(sortByDate);

	    for(var i=0; i<pages.length, page=pages[i]; i++) {
	    	rss += '\n<item>';
	    	rss += '<title>' + page.get('title') + '</title>';
			rss += '<link>http://example.com/blog/' + page.get('paths').url + '</link>';
			rss += '</item>';
	    }
	    return rss;
	}

Notice that we are sorting the pages by the variable `date` which is defined in the Markdown files.

The final files tree looks like that:

	/blog
		/articles
			/A.html
			/A.md
			/B.html
			/B.md
			/C.html
			/C.md
		/themes
			// ... Techy's themes here
		/feed.xml
		/feed.xml.source
		/rss.techy.js
		/TechyFile.js

The resulted `feed.xml` contains all the three articles sorted by date:

	&lt;?xml version="1.0"?>
	&lt;rss version="2.0">
	  &lt;channel>
	    &lt;title>Example Channel&lt;/title>
	    &lt;link>http://example.com/&lt;/link>
	    &lt;description>My example channel&lt;/description>
		&lt;item>&lt;title>Article B&lt;/title>&lt;link>http://example.com/blog/articles/B.html&lt;/link>&lt;/item>
		&lt;item>&lt;title>Article A&lt;/title>&lt;link>http://example.com/blog/articles/A.html&lt;/link>&lt;/item>
		&lt;item>&lt;title>Article C&lt;/title>&lt;link>http://example.com/blog/articles/C.html&lt;/link>&lt;/item>
	  &lt;/channel>
	&lt;/rss>

The full code of the example could be found [here](https://github.com/krasimir/techy/tree/gh-pages/examples/rss-generation/blog).

---

<% template('social') %>
<% template('footer') %>
<% template('ga') %>