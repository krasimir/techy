<% set('name', 'home') %>

<a href="<% linkto('custom-page') %>">B page.</a>
<a href="<% linkto('d-page') %>">D page.</a>
<a href="<% linkto(page('d-page')) %>">D page.</a>