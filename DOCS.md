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
@import 'path/to/jigsass-tools-bidi/scss/index';
```

Managing bi-directionality in CSS can be an annoying, time consuming and error-prone task.

JigSass Bidi was written to make this process as simple as possible, without sacrificing 
flxibilty. It eases the process of writing clean and maintainable bidirectional style sheets 
by using a single mixin to handle transformation of all direction-related styles
(values and/or properties) by automatically interpreting directions as `start`\`end` 
instead of `left`\`right`. 

### Caveats
  - The `background` shorthand is not supported. Set the `background-image`
    and `background-position` properties directly.
  - When multi-dimensional lists are passsed to to `$values` argument
    (e.g., to border-radius, box-shadow, text-shadow or background-position),
    They should be passed as space separated lists inside a comma-separated list.
  - The `X` argument of `backgrond-position` and `transform-origin` can be transformed
    only if set to `start`, `end` or a number in percentage (`%`).
    transforming non-relative widths requires knowledge of the container's dimensions.


**License:** MIT



[npm-image]: https://badge.fury.io/js/jigsass-tools-bidi.svg
[npm-url]: https://npmjs.org/package/jigsass-tools-bidi

[travis-image]: https://travis-ci.org/TxHawks/jigsass-tools-bidi.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/jigsass-tools-bidi
[daviddm-image]: https://david-dm.org/TxHawks/jigsass-tools-bidi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/jigsass-tools-bidi
