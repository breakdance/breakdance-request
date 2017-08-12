#!/usr/bin/env node

var ok = require('log-ok');
var url = require('url');
var path = require('path');
var write = require('write-file');
var request = require('./');
var opts = {
  alias: {
    dest: 'd',
    src: 's',
    condense: 'c',
    help: 'h',
    omit: 'o',
    pick: 'p',
    version: 'V'
  }
};

var argv = require('minimist')(process.argv.slice(2), opts);

if (argv.help) {
  help();
  process.exit();
}

var src = argv.s || argv._[0];
var dest = argv.d || argv._[1];

if (src && !dest) {
  dest = path.basename(src, path.extname(src)) + '.md';
}

if (!src || !dest) {
  help();
  process.exit();
}

request(src, argv)
  .then(function(res) {
    write(dest, res.markdown, function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      ok('done');
      process.exit();
    });
  })
  .catch(console.error)


function help() {
  console.error('Usage: $ bdr [options] <src> <dest>');
  console.error();
  console.error('   src:  The URL of the source file to convert to markdown');
  console.error('  dest:  Name of the markdown destination file to create.');
  console.error('         By default the HTML filename is used with a .md');
  console.error('         extension.');
  console.error();
  console.error('Options:');
  console.error();
  console.error('  -h, --help', '    Show this help menu in the terminal');
  console.error('  -s, --src', '     Show this help menu in the terminal');
  console.error('  -c, --condense', 'Collapse more than two newlines to only');
  console.error('', '                two newlines. Enabled by default');
  console.error('  -d, --dest', '    The destination filepath to use.');
  console.error('  -o, --omit', '    One or more tags to omit entirely from');
  console.error('', '                the HTML before converting to markdown.');
  console.error('  -p, --pick', '    One or more tags to pick entirely from the');
  console.error('', '                HTML before converting to markdown.');
  console.error('  --comments', '    Include HTML code comments in the generated');
  console.error('', '                markdown string. Disabled by default');
  console.error();
}
