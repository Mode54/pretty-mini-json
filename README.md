# Pretty Mini JSON

A simple CLI tool to shrink/minify or prettify [JSON](http://json.org) data.

## Installation

```sh
$ npm install pretty-mini-json
```

## Usage

Basic JSON minify
```sh
$ pretty-mini-json my_file.json
```

Basic JSON prettify
```sh
$ pretty-mini-json -p my_file.json
```

JSON minify my_file.json to file named my_file.min.json
```sh
$ pretty-mini-json -o my_file.min.json my_file.json
```

JSON prettify my_file.min.json to file named my_file.json
```sh
$ pretty-mini-json -po my_file.json my_file.min.json
```
