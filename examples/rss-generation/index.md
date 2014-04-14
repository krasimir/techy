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
	date: 02-04-2014
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

	