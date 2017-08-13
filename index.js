#!/usr/bin/env node

var url = require('url');
var merge = require('mixin-deep');
var needle = require('needle');
var reduce = require('p-reduce');
var Breakdance = require('breakdance');
var reflinks = require('breakdance-reflinks');
var isObject = require('isobject');

/**
 * The main export is a function that takes a `url` and `options`,
 * and returns a promise. See [breakdance](http://breakdance.io)
 * for documentation and all available options.
 *
 * ```js
 * request('http://breakdance.io/plugins.html')
 *   .then(function(res) {
 *     console.log(res.markdown);
 *   });
 * ```
 * @param {String} `url` The url of the HTML file to convert to markdown using [breakdance](http://breakdance.io)
 * @param {Object} `options` Options to pass to [breakdance](http://breakdance.io)
 * @return {Promise}
 * @api public
 */

function request(address, options) {
  if (isObject(address)) {
    options = address;
    address = options.url;
  }

  if (typeof address !== 'string') {
    return Promise.reject(new Error('expected a string'));
  }

  var opts = merge({port: 80}, options, {url: address});
  opts = merge({}, opts, url.parse(opts.url));

  return new Promise(function(resolve, reject) {
    needle.get(opts.url, opts, function(err, res) {
      if (err) {
        reject(err);
        return;
      }

      var content = isObject(res.body) && res.body.content
        ? res.body.content
        : res.body;

      res.url = opts.url;
      res.options = opts;
      res.markdown = convert(content, opts);
      resolve(res);
    });
  });
}

/**
 * Convert multiple HTML files to markdown by passing a base `url`
 * and an array of `paths`.
 *
 * ```js
 * request.reduce('http://breakdance.io/', ['docs.html', 'plugins.html'])
 *   .then(function(urls) {
 *     urls.forEach((res) => console.log(res.md));
 *   });
 * ```
 * @param {String} `url` The base url to use.
 * @param {String} `paths` One or more paths to concatenate to the base `url`.
 * @param {Object} `options` Options to pass to [breakdance](http://breakdance.io)
 * @return {Promise}
 * @api public
 */

request.reduce = function(domain, paths, options) {
  if (isObject(domain)) {
    options = domain;
    domain = options.domain;
  }

  return reduce(arrayify(paths), function(acc, path) {
    return request(url.resolve(domain, stringify(path)), options)
      .then((res) => acc.concat(res));
  }, []);
};

function convert(str, options) {
  var bd = new Breakdance(options);
  bd.before('eos', reflinks(options));
  return bd.render(str);
}

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

function stringify(val) {
  return (val && typeof val === 'string') ? val : '';
}

/**
 * Expose `request`
 */

module.exports = request;
