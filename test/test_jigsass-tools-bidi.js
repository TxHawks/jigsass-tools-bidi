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

  describe('_jigsass-bidi-simple [Mixin]', () => {
    describe('LTR', () => {
      describe('Property', () => {
        it('Does nothing when no action is required', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('clear', 'both', false)
            .equals('clear:both');
        });

        it('Correctly converts `start` in the `$property` argument', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('margin-start', '6px', false)
            .equals('margin-left:6px');
        });

        it('Correctly converts `end` in the `$property` argument', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('border-top-end-radius', '6px', false)
            .equals('border-top-right-radius:6px');
        });

        it('Correctly converts values to rem units', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('border-top-end-radius', '6px', true)
            .equals('border-top-right-radius:1rem');
        });
      });

      describe('Values', () => {
        it('Does nothing when no action is required', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('clear', 'both', false)
            .equals('clear:both');
        });

        it('Correctly converts `$values` property when it is set to `start`', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('float', 'start', false)
            .equals('float:left');
        });

        it('Correctly converts `$values` property when it is set to `end`', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('float', 'end', false)
            .equals('float:right');
        });
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } });

      describe('Property', () => {
        it('Does nothing when no action is required', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('clear', 'both', false)
            .equals('clear:both');
        });

        it('Correctly converts `start` in the `$property` argument', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('margin-start', '6px', false)
            .equals('margin-right:6px');
        });

        it('Correctly converts `end` in the `$property` argument', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('border-top-end-radius', '6px', false)
            .equals('border-top-left-radius:6px');
        });

        it('Correctly converts values to rem units', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('border-top-end-radius', '6px', true)
            .equals('border-top-left-radius:1rem');
        });
      });

      describe('Values', () => {
        it('Does nothing when no action is required', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('clear', 'both', false)
            .equals('clear:both');
        });

        it('Correctly converts `$values` property when it is set to `start`', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('float', 'start', false)
            .equals('float:right');
        });

        it('Correctly converts `$values` property when it is set to `end`', () => {
          sassaby.includedMixin('_jigsass-bidi-simple')
            .calledWithArgs('float', 'end', false)
            .equals('float:left');
        });
      });
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
            .calledWithArgs('(128px, 6px)', '$rem: false')
            .equals('border-radius: 128px  /  6px');
        });

        it('prints values in the correct order when called with two secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(6px, 12px 18px)', '$rem: false')
            .equals('border-radius: 6px  /  12px 18px');
        });

        it('Returns values in rem', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(6px 12px, 12px 6px)', '$rem: true')
            .equals('border-radius: 1rem 2rem  /  2rem 1rem');
        });

        it('prints values in the correct order when called with three secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(8px, 12px 6px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  12px 6px 18px');
        });

        it('prints values in the correct order when called with four secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(8px, 12px 6px 5px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  12px 6px 5px 18px');
        });
      });
      describe('RTL', () => {
        const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

        it('prints single secondary value when a single value is passed', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(128px, 6px)', '$rem: false')
            .equals('border-radius: 128px  /  6px');
        });

        it('prints values in the correct order when called with two secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(6px, 18px 12px)', '$rem: false')
            .equals('border-radius: 6px  /  12px 18px');
        });

        it('Returns values in rem', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(6px 12px, 12px 6px)', '$rem: true')
            .equals('border-radius: 2rem 1rem  /  1rem 2rem');
        });

        it('prints values in the correct order when called with three secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('(8px, 12px 6px 18px)', '$rem: false')
            .equals('border-radius: 8px  /  6px 12px 6px 18px');
        });

        it('prints values in the correct order when called with four secondary values', () => {
          sassaby.includedMixin('_jigsass-bidi-bdrs')
            .calledWithArgs('((8px, 12px 6px 5px 18px))', '$rem: false')
            .equals('border-radius: 8px  /  6px 12px 18px 5px');
        });
      });
    });
  });

  describe('_jigsass-bidi-sides [Mixin]', () => {
    describe('LTR', () => {
      it('Does not change order when one values is passed in ltr mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px', false)
          .equals('margin: 12px');
      });

      it('Does not change order when two values are passed in ltr mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px', false)
          .equals('margin: 12px 8px');
      });

      it('Does not change order when three values are passed in ltr mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px 10px', false)
          .equals('margin: 12px 8px 10px');
      });

      it('Does not change order when four values are passed in ltr mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px 10px 6px', false)
          .equals('margin: 12px 8px 10px 6px');
      });

      it ('Can generate values in rem', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 18px 3px 6px', true)
          .equals('margin: 2rem 3rem .5rem 1rem');
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('Does not change order when one values is passed in rtl mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px', false)
          .equals('margin: 12px');
      });

      it('Does not change order when two values are passed in rtl mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px', false)
          .equals('margin: 12px 8px');
      });

      it('Does not change order when three values are passed in rtl mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px 10px', false)
          .equals('margin: 12px 8px 10px');
      });

      it('Changes order when four values are passed in rtl mode', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 8px 10px 6px', false)
          .equals('margin:12px 6px 10px 8px');
      });

      it ('Can generate values in rem', () => {
        sassaby.includedMixin('_jigsass-bidi-sides')
          .calledWithArgs('margin', '12px 18px 3px 6px', true)
          .equals('margin: 2rem 1rem .5rem 3rem');
      });
    });
  });

  describe('_jigsass-bidi-bgi [Mixin]', () => {
    it('Outputs original values if no conversion is needed', () => {
      sassaby.includedMixin('_jigsass-bidi-bgi')
        .calledWithArgs('url(/path/to/image)')
        .equals('background-image: url(/path/to/image)');
    });

    describe('LTR', () => {
      describe('End', () => {
        it('Converts end to right when it is the only direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to end, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to right, blue, green 40%, red)');
        });

        it('Converts end to right when it is the first direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to end top, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to right top, blue, green 40%, red)');
        });

        it('Converts end to right when it is the second direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to top end, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to top right, blue, green 40%, red)');
        });
      });

      describe('Start', () => {
        it('Converts start to left when it is the only direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to start, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to left, blue, green 40%, red)');
        });

        it('Converts start to left when it is the first direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to start top, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to left top, blue, green 40%, red)');
        });

        it('Converts start to left when it is the second direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to top start, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to top left, blue, green 40%, red)');
        });
      });

      describe('Deg', () => {
        it('Does nothing when `deg` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(45deg, blue, green 40%, red)')
            .equals('background-image: linear-gradient(45deg, blue, green 40%, red)');
        });

        it('Does nothing when `deg` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-45deg, blue, green 40%, red)')
            .equals('background-image: linear-gradient(-45deg, blue, green 40%, red)');
        });
      });

      describe('Turn', () => {
        it('Does nothing when `turn` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(0.27turn, blue, green 40%, red)')
            .equals('background-image: linear-gradient(0.27turn, blue, green 40%, red)');
        });

        it('Does nothing when `turn` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-.3turn, blue, green 40%, red)')
            .equals('background-image: linear-gradient(-0.3turn, blue, green 40%, red)');
        });
      });

      describe('Grad', () => {
        it('Does nothing when `grad` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(100grad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(100grad, blue, green 40%, red)');
        });

        it('Does nothing when `grad` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-89grad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(-89grad, blue, green 40%, red)');
        });
      });

      describe('Rad', () => {
        it('Does nothing when `rad` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(1.2rad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(1.2rad, blue, green 40%, red)');
        });

        it('Does nothing when `rad` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-2.7rad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(-2.7rad, blue, green 40%, red)');
        });
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      describe('End', () => {
        it('Converts end to left when it is the only direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to end, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to left, blue, green 40%, red)');
        });

        it('Converts end to left when it is the first direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to end top, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to left top, blue, green 40%, red)');
        });

        it('Converts end to left when it is the second direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to top end, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to top left, blue, green 40%, red)');
        });
      });

      describe('Start', () => {
        it('Converts start to right when it is the only direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to start, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to right, blue, green 40%, red)');
        });

        it('Converts start to right when it is the first direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to start top, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to right top, blue, green 40%, red)');
        });

        it('Converts start to right when it is the second direction argument', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(to top start, blue, green 40%, red)')
            .equals('background-image: linear-gradient(to top right, blue, green 40%, red)');
        });
      });

      describe('Deg', () => {
        it('Reverses gradient direction when `deg` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(45deg, blue, green 40%, red)')
            .equals('background-image: linear-gradient(315deg, blue, green 40%, red)');
        });

        it('Reverses gradient direction when `deg` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-45deg, blue, green 40%, red)')
            .equals('background-image: linear-gradient(405deg, blue, green 40%, red)');
        });
      });

      describe('Turn', () => {
        it('Reverses gradient direction when `turn` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(0.27turn, blue, green 40%, red)')
            .equals('background-image: linear-gradient(0.73turn, blue, green 40%, red)');
        });

        it('Reverses gradient direction when `turn` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-.3turn, blue, green 40%, red)')
            .equals('background-image: linear-gradient(1.3turn, blue, green 40%, red)');
        });
      });

      describe('Grad', () => {
        it('Reverses gradient direction when `grad` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(100grad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(300grad, blue, green 40%, red)');
        });

        it('Reverses gradient direction when `grad` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-89grad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(489grad, blue, green 40%, red)');
        });
      });

      describe('Rad', () => {
        it('Reverses gradient direction when `rad` is positive', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(1.2rad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(5.08319rad, blue, green 40%, red)');
        });

        it('Reverses gradient direction when `rad` is negative', () => {
          sassaby.includedMixin('_jigsass-bidi-bgi')
            .calledWithArgs('linear-gradient(-2.7rad, blue, green 40%, red)')
            .equals('background-image: linear-gradient(8.98319rad, blue, green 40%, red)');
        });
      });
    });
  });

  describe('_jigsass-bidi-bgp [Mixin]', () => {
    describe('LTR', () => {
      it('Converts end to right', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('end 25%, false')
          .equals('background-position: right 25%');
      });

      it('Converts start to left', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('start bottom, false')
          .equals('background-position: left bottom');
      });

      it('Does nothing to numbers in LTR mode (single number)', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('25%, false')
          .equals('background-position: 25%');
      });

      it('Does nothing to numbers in LTR mode (two numbers)', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('25% 30%, false')
          .equals('background-position: 25% 30%');
      });

      it('Can handle multiple backgrounds', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('(25% 30%, end bottom), false')
          .equals('background-position: 25% 30%, right bottom');
      });
    });
    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('Converts end to left', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('end 25%, false')
          .equals('background-position: left 25%');
      });

      it('Converts start to right', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('start bottom, false')
          .equals('background-position: right bottom');
      });

      it('Splits single number to two, and transforms only the first', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('25%, false')
          .equals('background-position: 75% 25%');
      });

      it('Transforms only first number when two are passed', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('25% 30%, false')
          .equals('background-position: 75% 30%');
      });

      it('Can handle multiple backgrounds', () => {
        sassaby.includedMixin('_jigsass-bidi-bgp')
          .calledWithArgs('(25% 30%, end bottom), false')
          .equals('background-position: 75% 30%, left bottom');
      });
    });
  });
  describe('_jigsass-bidi-direction [Mixin]', () => {
    describe('LTR', () => {
      it('Converts ste to ltr', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ste')
          .equals('direction: ltr');
      });

      it('Converts ets to rtl', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ets')
          .equals('direction: rtl');
      });

      it('Does not convert ltr', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ltr')
          .equals('direction: ltr');
      });

      it('Does not convert rtl', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('rtl')
          .equals('direction: rtl');
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('Converts ste to rtl', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ste')
          .equals('direction: rtl');
      });

      it('Converts ets to ltr', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ets')
          .equals('direction: ltr');
      });

      it('Does not convert ltr', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('ltr')
          .equals('direction: ltr');
      });

      it('Does not convert rtl', () => {
        sassaby.includedMixin('_jigsass-bidi-direction')
          .calledWithArgs('rtl')
          .equals('direction: rtl');
      });
    });
  });
});
