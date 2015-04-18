# Pretty Mini JSON

A simple CLI tool to shrink/minify or prettify [JSON](http://json.org) data.

## Installation

```sh
$ npm install pretty-mini-json
```

## Usage

###Basic JSON minify
```sh
$ pretty-mini-json my_file.json
```

###Basic JSON prettify
```sh
$ pretty-mini-json -p my_file.json
```

###JSON minify to file
```sh
$ pretty-mini-json -o my_file.min.json my_file.json
```

###JSON prettify to file
```sh
$ pretty-mini-json -po my_file.min.json my_file.json
```
