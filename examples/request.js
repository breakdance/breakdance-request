const request = require('..');

request('https://jekyllrb.com/docs/variables/')
  .then(function(res) {
    console.log(res);
  })
  .catch(console.error)
