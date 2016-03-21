'use strict';

/* global assert, fs, path, Sassaby,  */

describe('jigsass-tools-bidi', () => {
  const file = path.resolve(__dirname, 'helpers/importer.scss');
  const sassaby = new Sassaby(file);

  it('Can be imported', () => {
    const sassaby = new Sassaby(file, { variables: { empty: '' } });
    sassaby.func('jig-var-equals').calledWithArgs('"", $empty');
  });

  describe('_jigsass-get-side [Function]', () => {
    describe('LTR', () => {
      it('Retruns `left` for `start` when in ltr', () => {
        sassaby.func('_jigsass-get-side')
          .calledWithArgs('start')
          .equals('left');
      });

      it('Retruns `right` for `end` when in ltr', () => {
        sassaby.func('_jigsass-get-side')
          .calledWithArgs('end')
          .equals('right');
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })
      it('Retruns `right` for `start` when in rtl', () => {
        sassaby.func('_jigsass-get-side')
          .calledWithArgs('start')
          .equals('right');
      });

      it('Retruns `left` for `end` when in rtl', () => {
        sassaby.func('_jigsass-get-side')
          .calledWithArgs('end')
          .equals('left');
      });
    });
  });

  describe('jigsass-str-replace [Function]', () => {
    it('Replaces a substring in the middle of a sring', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('A string to search in', 'to', 'we can')
        .equals('A string we can search in');
    });

    it('Replaces a substring at he beginning of a sring', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('"foo bar baz"', 'foo', 'quax')
        .equals('quax bar baz');
    });

    it('Replace all instances of the substring by default', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo bar baz quax foo bar norf', 'bar', 'frog')
        .equals('foo frog baz quax foo frog norf');
    });

    it('Can replace only a single instance of the substring', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo bar baz quax foo bar norf', 'bar', 'frog', '$replace-all: false')
        .equals('foo frog baz quax foo bar norf');
    });

    it('Is case sensitive', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo Bar baz', 'bar', 'quax')
        .equals('foo Bar baz');
    });

    it('Can ignore case diffrences', () => {
      sassaby.func('jigsass-str-replace')
        .calledWithArgs('foo Bar baz', 'bar', 'Quax', '$match-case: false')
        .equals('foo Quax baz');
    });
  });
});
