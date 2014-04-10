---
username: Derek Worthen
age: young
contact: 
 email: email@domain.com
 address: some location
pets: 
 - cat
 - dog
 - bat
match: !!js/regexp /pattern/gim
run: !!js/function function(a) { return a.toUpperCase(); }
---

# Hello world

Hello, my name is <% get('username') %>. My address is <% get('contact').address %>. I love <% get('run')(get('pets')[1]) %>. And here is a data from another page: <% page('another page').get('itworks') %>.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, voluptatem eveniet corrupti eum vero consequatur veniam iusto facere ab amet quisquam distinctio maxime minus. Porro, aliquam illum facere obcaecati voluptatum.