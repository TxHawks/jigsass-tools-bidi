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


  describe('_jigsass-parse-bdrs-values [Function]', () => {
    it('Return a map with the correct values when only primary values are passed ', () => {
      sassaby.func('inspect')
        .calledWithArgs('_jigsass-parse-bdrs-values(12px 8px 9px 10px)')
        .equals('(primary:12px 8px 9px 10px,secondary:null)');
    });

    it('Return a map with the correct values when primary values are passed ' +
       'as a list and secondary values are passed numbers', () => {
      sassaby.func('inspect')
        .calledWithArgs('_jigsass-parse-bdrs-values((12px 8px 9px 10px) 15px 18px)')
        .equals('(primary:12px 8px 9px 10px,secondary:15px 18px)');
    });

    it('Return a map with the correct values when primary values are passed ' +
       'as numbers and secondary values are passed as a list', () => {
      sassaby.func('inspect')
        .calledWithArgs('_jigsass-parse-bdrs-values(12px 8px 9px 10px (15px 18px))')
        .equals('(primary:12px 8px 9px 10px,secondary:15px 18px)');
    });

    it('Return a map with the correct values when a single primary value is passed ' +
       'as a number and a single secondary value is passed as a list', () => {
      sassaby.func('inspect')
        .calledWithArgs('_jigsass-parse-bdrs-values(12px (26px,))')
        .equals('(primary:12px,secondary:26px)');
    });

    it('Return a map with the correct values when both primary and secondary ' +
       'values are passed as lists', () => {
      sassaby.func('inspect')
        .calledWithArgs('_jigsass-parse-bdrs-values((12px 8px 9px 10px) (15px 18px))')
        .equals('(primary:12px 8px 9px 10px,secondary:15px 18px)');
    });
  });


  describe('_jigsass-bidi-bdrs [Mixin]', () => {
    describe('LTR', () => {
      it('prints single value when called with a single value', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px', '$rem: false')
          .equals('border-radius: 6px');
      });

      it('prints values in the correct order when called with two values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px 12px', '$rem: false')
          .equals('border-radius: 6px 12px');
      });

      it('Returns values in rem', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px 12px', '$rem: true')
          .equals('border-radius: 1rem 2rem');
      });

      it('prints values in the correct order when called with three values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('8px 12px 6px', '$rem: false')
          .equals('border-radius: 8px 12px 6px');
      });

      it('prints values in the correct order when called with four values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('8px 12px 6px 5px', '$rem: false')
          .equals('border-radius: 8px 12px 6px 5px');
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('prints single value when called with a single value', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px', '$rem: false')
          .equals('border-radius: 6px');
      });

      it('prints values in the correct order when called with two values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px 12px', '$rem: false')
          .equals('border-radius: 12px 6px');
      });

      it('Returns values in rem', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('6px 12px', '$rem: true')
          .equals('border-radius: 2rem 1rem');
      });

      it('prints values in the correct order when called with three values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('8px 12px 6px', '$rem: false')
          .equals('border-radius: 12px 8px 12px 6px');
      });

      it('prints values in the correct order when called with four values', () => {
        sassaby.includedMixin('_jigsass-bidi-bdrs')
          .calledWithArgs('8px 12px 6px 5px', '$rem: false')
          .equals('border-radius: 12px 8px 5px 6px');
      });
    });

    describe('Secondary (vertical) values', () => {
      describe('LTR', () => {
        it('prints single secondary value when a single value is passed', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('128px (6px,)', '$rem: false')
            .equals('border-radius: 128px  /  6px');
        });

        it('prints values in the correct order when called with two secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('6px (12px 18px)', '$rem: false')
            .equals('border-radius: 6px  /  12px 18px');
        });

        it('Returns values in rem', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('6px 12px (12px 6px)', '$rem: true')
            .equals('border-radius: 1rem 2rem  /  2rem 1rem');
        });

        it('prints values in the correct order when called with three secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('8px (12px 6px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  12px 6px 18px');
        });

        it('prints values in the correct order when called with four secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('8px (12px 6px 5px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  12px 6px 5px 18px');
        });
      });
      describe('RTL', () => {
        const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

        it('prints single secondary value when a single value is passed', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('128px (6px,)', '$rem: false')
            .equals('border-radius: 128px  /  6px');
        });

        it('prints values in the correct order when called with two secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('6px (18px 12px)', '$rem: false')
            .equals('border-radius: 6px  /  12px 18px');
        });

        it('Returns values in rem', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('6px 12px (12px 6px)', '$rem: true')
            .equals('border-radius: 2rem 1rem  /  1rem 2rem');
        });

        it('prints values in the correct order when called with three secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('8px (12px 6px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  6px 12px 6px 18px');
        });

        it('prints values in the correct order when called with four secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('8px (12px 6px 5px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  6px 12px 18px 5px');
        });
      });
    });
  });
});
