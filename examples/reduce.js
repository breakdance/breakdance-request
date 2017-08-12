const breakdance = require('..');

var pages = ['variables/', 'assets/', 'collections/'];
breakdance.reduce('https://jekyllrb.com/docs/', pages)
  .then(function(pages) {
    pages.forEach((page) => console.log(page.md));
  })
  .catch(console.error)
