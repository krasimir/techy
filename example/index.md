@techy.set('layout', 'layouts/post');
@techy.set('title', 'A simple DOM library in 20 lines');
@techy.set('date', {date: 13, month: 0, year: 2014});
@techy.set('tags', ['JavaScript', 'HTML5']);

# @techy.get('title');

@techy.postinfo();

There are @techy.numofpages(); pages published on [this site](/). And here is `inline code` which is used in a sentence.

	var techy = 'super cool';

You could also post a quote:

> First solve the problem, then write the code.

## Second title here

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula est vitae nunc dapibus, id ultricies arcu elementum. In hac habitasse platea dictumst. Ut at laoreet dolor. Maecenas dapibus erat ut hendrerit euismod. Praesent fermentum orci sed egestas luctus. 

- - -

* Option A
* Option B
* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula est vitae nunc dapibus, id ultricies arcu elementum. In hac habitasse platea dictumst. Ut at laoreet dolor. Maecenas dapibus erat ut hendrerit euismod. Praesent fermentum orci sed egestas luctus. 
* Option C

The layout is @techy.get('layout');.