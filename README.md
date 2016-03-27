# JigSass Tools Bidi
[![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]   

 > Painless bidirectional style authoring

## Installation

Using npm:

```sh
npm i -S jigsass-tools-bidi
```

## Usage

```scss
@import 'path/to/jigsass-tools-selectors/scss/index';
```

Managing bi-directionality in CSS can be an annoying, time consuming and error-prone task.

JigSass Bidi was written to make this process as simple as possible, without sacrificing 
flxibilty. It eases the process of writing clean and maintainable bidirectional style sheets 
by using a single mixin to handle transformation of all direction-related styles
(values and/or properties) by automatically interpreting directions as `start`\`end` 
instead of `left`\`right`. 

### Configuration

JigSass Bidi has only two configuration variables: 
  - `$jigsass-direction`, which can be set to either `ltr` (default) or `rtl`. 
    JigSass Bidi will determine how to interpert what `start`/`end` means, and transform values
    accordingly [documentation](https://txhawks.github.io/jigsass-tools-bidi/#variable-jigsass-direction).
  - $jigsass-bidi-rem-default, which determines if pixel values should be automatically converted
    into `rem` unit. This setting can be overriden individually at every call to the 
    `jigsass-bidi` mixin by passing `true` or `false` to the `$rem` argument
    [(documentation)](https://txhawks.github.io/jigsass-tools-bidi/#variable-jigsass-bidi-rem-default).

### Mixins
  - `jigsass-bidi`<br>
    takes 4 arguments: `$property`, `$values`, `$bps` and `$rem`
    [(documentation)](https://txhawks.github.io/jigsass-tools-bidi/#mixin-jigsass-bidi).
  - `jigsass-bidi-direction`<br>
    Temporarily set the direction for the context of the mixin's execution
    [(documentation)](https://txhawks.github.io/jigsass-tools-bidi/#mixin-jigsass-bidi-direction).

### Caveats
  - The `background` shorthand is not supported. Set the `background-image`
    and `background-position` properties directly.
  - When multi-dimensional lists are passsed to to `$values` argument
    (e.g., to border-radius, box-shadow, text-shadow or background-position),
    They should be passed as space separated lists inside a comma-separated list.
  - The `X` argument of `backgrond-position` and `transform-origin` can be transformed
    only if set to `start`, `end` or a number in percentage (`%`).
    transforming non-relative widths requires knowledge of the container's dimensions.


## Development

It is a best practice for JigSass modules to *not* automatically generate css on `@import`, but 
rather have to user explicitly enable the generation of specific styles from the module.

Contributions in the form of pull-requests, issues, bug reports, etc. are welcome.
Please feel free to fork, hack or modify JigSass Tools Bidi in any way you see fit.

#### Writing documentation

Good documentation is crucial for scalability and maintainability. When contributing,
please do make sure that all Sass functionality (functions, mixins, 
variables and placeholder selectors) is well documented.

Documentation is auto-generated using [SassDoc](http://sassdoc.com/)

#### Running tests
`gulp lint` will, well, lint the contents scss files in the `scss` directory.

`gulp test` with run module's test using Mocha and Sassaby.

`gulp tdd` will watch both the Sass files and the test specs for changes, and will
run tests automatically upon them.

#### Writing tests

JigSass Tools Bidi tests are written using [Sassaby](https://github.com/ryanbahniuk/sassaby)
and Mocha. Spec files are located in the `test` directory.

Mocha allows us to place a call to `before()` in the root of any test file and it 
will be run once, before all the other tests in every `test_*.js` file. 
We can also `require()` files and assign them to the global object to make them 
available to all `test_*.js` files. 

jigsass-tools-bidi uses a file called `helper.js` can be used to set up mocha 
globals requires and `before()`.

In addition to Sassaby's testing functions, jigsass-tools-bidi makes a few Sass
functions available to the test suite, for use inside Sassaby tests:

<dl>
  <dt>jig-var-equals($value, $var) -> {boolean}<dt>
  <dd>
		Check if a variable equals a value.<br />
		<strong>$value</strong> {*}: A value to compare the value of $var to.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-var-type-is($type, $var) -> {boolean}<dt>
  <dd>
		Check if a variable is of a certain type.<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$var</strong> {*}: The variable to test<br />
	</dd>
  <dt>jig-map-key-equals($value, $map, $keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is assigned a cerain value.<br />
		<strong>$value</strong> {*}:  A value to compare the value of a key in $map with.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
  <dt>jig-map-key-type-is($type, $map, keys...) -> {boolean}<dt>
  <dd>
		Check if a map's key is of a certain type<br />
		<strong>$type</strong> {string}: A type to compare with the type of $var.<br />
		<strong>$map</strong> {map}: The map to test.<br />
		<strong>$keys... </strong> {arglist}: A recursive chain of keys.<br />
	</dd>
</dl>


## File structure
```bash
┬ ./
│
├─┬ scss/ 
│ └─ index.scss # The module's importable file.
│
├── sassdoc/    # Generated documentation 
│               # of the module's sass features
│
└─┬─ test/
  │
  ├─┬ helpers/
  │ │
  │ ├── importer.scss       # Used for easilty importing tested scss files
  │ │
  │ └── _test_helpers.scss  # JigSass's assertion helpers,
  │                         # for use inside Sassaby tests.
  │                         
  ├── helper.js              # Used for defining global `before()`
  │                          # functions and requiring modules.
  │                         
  └── test_jigsass-tools-bidi  # Specs. Mocha will automatically 
                             # run all javascript files located
                             # in the `test` directory.
```

**License:** MIT



[npm-image]: https://badge.fury.io/js/jigsass-tools-bidi.svg
[npm-url]: https://npmjs.org/package/jigsass-tools-bidi

[travis-image]: https://travis-ci.org/TxHawks/jigsass-tools-bidi.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/jigsass-tools-bidi
[daviddm-image]: https://david-dm.org/TxHawks/jigsass-tools-bidi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/jigsass-tools-bidi
