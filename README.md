# Pretty Mini JSON

[![NPM Version](http://img.shields.io/npm/v/pretty-mini-json.svg?style=flat)](https://www.npmjs.org/package/pretty-mini-json)
[![NPM Downloads](https://img.shields.io/npm/dt/pretty-mini-json.svg?style=flat)](https://www.npmjs.org/package/pretty-mini-json)
[![Dependency Status](https://img.shields.io/david/mode54/pretty-mini-json.svg)](https://david-dm.org/mode54/pretty-mini-json)
[![Codacy Badge](https://img.shields.io/codacy/43ece80331c246179695e41f81eeffe2.svg)](https://www.codacy.com/app/Mode54/pretty-mini-json)
[![License](https://img.shields.io/npm/l/pretty-mini-json.svg)](http://opensource.org/licenses/MIT)

A simple CLI tool to shrink/minify or prettify [JSON](http://json.org) data from stdin, file or url.

[![NPM](https://nodei.co/npm/pretty-mini-json.png?downloadRank=true&stars=true)](https://nodei.co/npm/pretty-mini-json/)

## Installation
Install this globally and you'll have access to the Pretty Mini JSON command anywhere on your system.

```sh
$ [sudo] npm install -g pretty-mini-json
```

## Usage
You can now call pretty-mini-json from anywhere using either `pmj` or the full name `pretty-mini-json`. I prefer the short name.


```sh
pmj [ options... ] [ filename | url ]
```

*filename* or *url* should be the last argument and should name the file or url from which to read the JSON data. If you don't specify it, it will try to read data from STDIN.

**Options**

```
$ pmj --help

	Usage: pmj [options] [file | url ...]

	A simple CLI tool to shrink/minify or prettify JSON data.

	Options:

	-h, --help               output usage information
	-V, --version            output the version number
	-p, --pretty             prettify JSON data
	-o, --outputFile <file>  write output to <file> instead of stdout
	-v, --verbose            makes stdout more verbose/talkative. Mostly useful for debugging.
```

## Examples

Here are some example calls using *my_file.json* and *my_file.min.json* as example files.

**Basic JSON minify**

Output minified version to stdout.
```sh
$ pmj my_file.json
```

**Basic JSON prettify**

Output prettified version to stdout.
```sh
$ pmj -p my_file.json
```

**JSON minify to output file**

Output minified version to an output file instead of stdout.
```sh
$ pmj my_file.json -o my_file.min.json
```

**JSON prettify to output file**

Output prettified version to an output file instead of stdout.
```sh
$ pmj -p my_file.min.json -o my_file.json
```

**Support for URL data source**

Replace file with a URL and pretty-mini-json will download and parse it.

Output minified version of JSON data from http endpoint to stdout.
```sh
$ pmj https://raw.githubusercontent.com/Mode54/pretty-mini-json/master/package.json
```

# Author
[Mode54](http://Mode54.com)

# License

[MIT](https://raw.githubusercontent.com/Mode54/pretty-mini-json/master/LICENSE)
