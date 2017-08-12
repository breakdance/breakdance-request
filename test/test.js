'use strict';

require('mocha');
var assert = require('assert');
var request = require('..');

describe('breakdance-request', function() {
  it('should export a function', function() {
    assert.equal(typeof request, 'function');
  });

  it('should expose a .reduce method', function() {
    assert.equal(typeof request.reduce, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    request()
      .catch(function(err) {
        assert(err);
        cb();
      });
  });

  it('should get html from a URL', function() {
    this.timeout(10000);

    return request('https://www.google.com/')
      .then(function(res) {
        assert(res);
        assert.equal(res.url, 'https://www.google.com/');
        assert.equal(typeof res.json.content, 'string');
        assert(res.json.content.length > 1);
      });
  });

  it('should convert html to markdown', function() {
    this.timeout(10000);

    return request('http://breakdance.io/plugins.html')
      .then(function(res) {
        assert(res);
        assert.equal(res.url, 'http://breakdance.io/plugins.html');
        assert.equal(typeof res.markdown, 'string');
        assert(res.markdown.length > 1);
      });
  });

  it('should reduce multiple urls', function() {
    this.timeout(10000);

    var paths = ['plugins.html', 'docs.html']
    return request.reduce({domain: 'http://breakdance.io/'}, paths)
      .then(function(urls) {
        assert(urls[0]);
        assert.equal(urls[0].url, 'http://breakdance.io/plugins.html');
        assert.equal(typeof urls[0].markdown, 'string');
        assert(urls[0].markdown.length > 1);

        assert(urls[1]);
        assert.equal(urls[1].url, 'http://breakdance.io/docs.html');
        assert.equal(typeof urls[1].markdown, 'string');
        assert(urls[1].markdown.length > 1);
      });
  });
});
