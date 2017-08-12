# breakdance-request [![NPM version](https://img.shields.io/npm/v/breakdance-request.svg?style=flat)](https://www.npmjs.com/package/breakdance-request) [![NPM monthly downloads](https://img.shields.io/npm/dm/breakdance-request.svg?style=flat)](https://npmjs.org/package/breakdance-request) [![NPM total downloads](https://img.shields.io/npm/dt/breakdance-request.svg?style=flat)](https://npmjs.org/package/breakdance-request) [![Linux Build Status](https://img.shields.io/travis/breakdance/breakdance-request.svg?style=flat&label=Travis)](https://travis-ci.org/breakdance/breakdance-request)

> Get a webpage from a URL and convert it to markdown.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save breakdance-request
```

## Usage

Add `breakdance-request` to your node.js application with the following line of JavaScript:

```js
var request = require('breakdance-request');
```

## API

### [request](index.js#L29)

The main export is a function that takes a `url` and `options`, and returns a promise. See [breakdance](http://breakdance.io) for documentation and all available options.

**Params**

* `url` **{String}**: The url of the HTML file to convert to markdown using [breakdance](http://breakdance.io)
* `options` **{Object}**: Options to pass to [breakdance](http://breakdance.io)
* `returns` **{Promise}**

**Example**

```js
request('http://breakdance.io/plugins.html')
  .then(function(res) {
    console.log(res.markdown);
  });
```

### [.reduce](index.js#L94)

Convert multiple HTML files to markdown by passing a base `url` and an array of `paths`.

**Params**

* `url` **{String}**: The base url to use.
* `paths` **{String}**: One or more paths to concatenate to the base `url`.
* `options` **{Object}**: Options to pass to [breakdance](http://breakdance.io)
* `returns` **{Promise}**

**Example**

```js
request.reduce('http://breakdance.io/', ['docs.html', 'plugins.html'])
  .then(function(urls) {
    urls.forEach((res) => console.log(res.md));
  });
```

## CLI

### Installing the CLI

```sh
$ npm install  --global breakdance-request
```

This adds the `bdr` command to your system path, allowing you to run breakdance-request CLI from any directory:

```sh
$ bdr
# or use the "breakdance-request" alias in case of conflicts
$ breakdance-request
```

### CLI examples

Get `http://breakdance.io/plugins.html` and convert it to markdown with [breakdance](http://breakdance.io), then write it to `plugins.md`.

```sh
$ bdr http://breakdance.io/plugins.html
# or using flags
$ bdr -s http://breakdance.io/plugins.html -d foo.md
# "pick" just the ".main-content" section from the page
$ bdr -s http://breakdance.io/plugins.html -d foo.md -p ".main-content"
```

### CLI options

```
Usage: $ bdr [options] <src> <dest>

   src:  The URL of the source file to convert to markdown
  dest:  Name of the markdown destination file to create.
         By default the HTML filename is used with a .md
         extension.

Options:

  -h, --help     Show this help menu in the terminal
  -s, --src      Show this help menu in the terminal
  -c, --condense Collapse more than two newlines to only
                 two newlines. Enabled by default
  -d, --dest     The destination filepath to use.
  -o, --omit     One or more tags to omit entirely from
                 the HTML before converting to markdown.
  -p, --pick     One or more tags to pick entirely from the
                 HTML before converting to markdown.
  --comments     Include HTML code comments in the generated
                 markdown string. Disabled by default

```

## About

### Related projects

You might also be interested in these projects:

* [breakdance-cli](https://www.npmjs.com/package/breakdance-cli): CLI for breakdance, the HTML to markdown converter for node.js. | [homepage](https://github.com/breakdance/breakdance-cli "CLI for breakdance, the HTML to markdown converter for node.js.")
* [breakdance-reflinks](https://www.npmjs.com/package/breakdance-reflinks): Breakdance plugin that aggregates the urls from hrefs and src attributes at the bottom of… [more](https://github.com/breakdance/breakdance-reflinks) | [homepage](https://github.com/breakdance/breakdance-reflinks "Breakdance plugin that aggregates the urls from hrefs and src attributes at the bottom of the file as reference links.")
* [breakdance](https://www.npmjs.com/package/breakdance): Breakdance is a node.js library for converting HTML to markdown. Highly pluggable, flexible and easy… [more](http://breakdance.io) | [homepage](http://breakdance.io "Breakdance is a node.js library for converting HTML to markdown. Highly pluggable, flexible and easy to use. It's time for your markup to get down.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 12, 2017._