# Pretty Mini JSON

A simple CLI tool to shrink/minify or prettify [JSON](http://json.org) data.

## Installation
Install this globally and you'll have access to the Pretty Mini JSON command anywhere on your system.

```sh
$ [sudo] npm install -g pretty-mini-json
```

## Usage
You can now call pretty-mini-json from anywhere using eiter `pmj` or the full name `pretty-mini-json`. I prefer the short name.

```sh
pmj [ options... ] [ filename ]
```

*filename* should be the last argument and should name the file from which to read the JSON data. If you don't specify it, it will read data from STDIN.

**Options**

```
$ pmj --help

	Usage: pmj [options] [file ...]

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
$ pmj -o my_file.min.json my_file.json
```

**JSON prettify to output file**

Output prettified version to an output file instead of stdout.
```sh
$ pmj -po my_file.json my_file.min.json
```

# Author
[Mode54](http://Mode54.com)

# License

MIT
