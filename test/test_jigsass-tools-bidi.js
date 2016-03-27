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

  describe('_jigsass-bidi-shadow [Mixin]', () => {
    describe('LTR', () => {
      describe('text-shadow', () => {
        it('Does not transform values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', 'inset 12px 4em 2rem #ccc', false)
            .equals('text-shadow: inset 12px 4em 2rem #ccc');
        });

        it('Does not transform values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', '12px 4em 2rem #ccc', false)
            .equals('text-shadow: 12px 4em 2rem #ccc');
        });

        it('Converts pixel values to rems', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', '12px 18px 6px 24px #ccc', true)
            .equals('text-shadow: 2rem 3rem 1rem 4rem #ccc');
        });
      });
      describe('box-shadow', () => {
        it('Does not transform values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', 'inset 12px 4em 2rem #ccc', false)
            .equals('box-shadow: inset 12px 4em 2rem #ccc');
        });

        it('Does not transform values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', '12px 4em 2rem #ccc', false)
            .equals('box-shadow: 12px 4em 2rem #ccc');
        });

        it('Converts pixel values to rems', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', '12px 18px 6px 24px #ccc', true)
            .equals('box-shadow: 2rem 3rem 1rem 4rem #ccc');
        });
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      describe('text-shadow', () => {
        it('Transforms values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', 'inset 12px 4em 2rem #ccc', false)
            .equals('text-shadow: inset -12px 4em 2rem #ccc');
        });

        it('Transforms negative values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', 'inset -12px 4em 2rem #ccc', false)
            .equals('text-shadow: inset 12px 4em 2rem #ccc');
        });

        it('Transforms values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', '12px 4em 2rem #ccc', false)
            .equals('text-shadow: -12px 4em 2rem #ccc');
        });

        it('Transforms negative values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', '-12px 4em 2rem #ccc', false)
            .equals('text-shadow: 12px 4em 2rem #ccc');
        });

        it('Transforms and Converts pixel values to rems', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('text-shadow', '12px 18px 6px 24px #ccc', true)
            .equals('text-shadow: -2rem 3rem 1rem 4rem #ccc');
        });
      });
      describe('box-shadow', () => {
        it('Transforms values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', 'inset 12px 4em 2rem #ccc', false)
            .equals('box-shadow: inset -12px 4em 2rem #ccc');
        });

        it('Transforms negative values when inset is specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', 'inset -12px 4em 2rem #ccc', false)
            .equals('box-shadow: inset 12px 4em 2rem #ccc');
        });

        it('Transforms values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', '12px 4em 2rem #ccc', false)
            .equals('box-shadow: -12px 4em 2rem #ccc');
        });

        it('Transforms negative values when inset is not specified', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', '-12px 4em 2rem #ccc', false)
            .equals('box-shadow: 12px 4em 2rem #ccc');
        });

        it('Transforms and converts pixel values to rems', () => {
          sassaby.includedMixin('_jigsass-bidi-shadow')
            .calledWithArgs('box-shadow', '12px 18px 6px 24px #ccc', true)
            .equals('box-shadow: -2rem 3rem 1rem 4rem #ccc');
        });
      });
    });
  });

  describe('_jigsass-bidi-transform [Mixin]', () => {
    describe('LTR', () => {
      it('Doesn\'t transform values of a single function in `LTR` mode', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('rotateZ(0.5turn), false')
          .equals('transform:rotateZ(0.5turn)');
      });

      it('Doesn\'t transform values of a multiple functions in `LTR` mode', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('rotateZ(0.5turn) translate3d(5px, 8px, 10px), false')
          .equals('transform:rotateZ(0.5turn) translate3d(5px, 8px, 10px)');
      });
    });

    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('Transform value in functions that support a single value', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('translateX(5px), false')
          .equals('transform:translateX(-5px)');
      });

      it('Transform single values in functions that support multiple values', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('translate(5px), false')
          .equals('transform:translate(-5px)');
      });

      it('Transform first of two values', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('skew(20deg, 50deg), false')
          .equals('transform:skew(340deg, 50deg)');
      });

      it('Transforms first of three values', () => {
        sassaby.includedMixin('_jigsass-bidi-transform')
          .calledWithArgs('translate3d(5px, 10px, 15px), false')
          .equals('transform:translate3d(-5px, 10px, 15px)');
      });

      describe('Rotate', () => {
        it('Transforms `deg` values in `rotate` function', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotate(181deg), false')
            .equals('transform:rotate(179deg)');
        });

        it('Transforms `turn` values in `rotateZ` function', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotateZ(0.25turn), false')
            .equals('transform:rotateZ(0.75turn)');
        });

        it('Transforms `deg` values in `rotateZ` function', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotateZ(181deg), false')
            .equals('transform:rotateZ(179deg)');
        });

        it('Transforms `grad` values in `rotateZ` function', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotateZ(100grad), false')
            .equals('transform:rotateZ(300grad)');
        });

        it('Transforms `grad` values in `rotateZ` function', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotateZ(0.76rad), false')
            .equals('transform:rotateZ(5.52319rad)');
        });

        it('Transforms Z values of rotate3d function when passed in turn units', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotate3d(0turn, 0turn, 0.25turn), false')
            .equals('transform:rotate3d(0turn, 0turn, 0.75turn)');
        });

        it('Transforms Z values of rotate3d function when passed in deg units', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotate3d(0deg, 0deg, 90deg), false')
            .equals('transform:rotate3d(0deg, 0deg, 270deg)');
        });

        it('Transforms Z values of rotate3d function when passed in grad units', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotate3d(0grad, 0grad, 100grad), false')
            .equals('transform:rotate3d(0grad, 0grad, 300grad)');
        });

        it('Transforms Z values of rotate3d function when passed in grad units', () => {
          sassaby.includedMixin('_jigsass-bidi-transform')
            .calledWithArgs('rotate3d(0rad, 0rad, 0.76rad), false')
            .equals('transform:rotate3d(0rad, 0rad, 5.52319rad)');
        });
      });
    });
  });

  describe('_jigsass-bidi-transform-origin [Mixin]', () => {
    describe('LTR', () => {
      it('Transforms `start` when single argument', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('start, false')
          .equals('transform-origin:left');
      });

      it('Transforms `start` when in 1st position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('start bottom, false')
          .equals('transform-origin:left bottom');
      });

      it('Transforms `end` when single argument', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('end, false')
          .equals('transform-origin:right');
      });

      it('Transforms `end` when in 1st position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('end bottom, false')
          .equals('transform-origin:right bottom');
      });

      it('Transforms `start` when in 2nd position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('top start, false')
          .equals('transform-origin:top left');
      });

      it('Transforms `end` when in 2nd position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('top end, false')
          .equals('transform-origin:top right');
      });
    });
    describe('RTL', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-direction': 'rtl', } })

      it('Transforms `start` when single argument', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('start, false')
          .equals('transform-origin: right');
      });

      it('Transforms `percentage` when single argument', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('75%, false')
          .equals('transform-origin: 25%');
      });

      it('Transforms `start` when in 1st position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('start bottom, false')
          .equals('transform-origin:right bottom');
      });

      it('Transforms `percentage` when in 1st position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('75% 30%, false')
          .equals('transform-origin: 25% 30%');
      });

      it('Transforms `end` when single argument', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('end, false')
          .equals('transform-origin:left');
      });

      it('Transforms `end` when in 1st position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('end bottom, false')
          .equals('transform-origin:left bottom');
      });

      it('Transforms `start` when in 2nd position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('top start, false')
          .equals('transform-origin:top right');
      });

      it('Transforms `percentage` when in 2nd position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('top 75%, false')
          .equals('transform-origin:top 25%');
      });

      it('Transforms `end` when in 2nd position', () => {
        sassaby.includedMixin('_jigsass-bidi-transform-origin')
          .calledWithArgs('top end, false')
          .equals('transform-origin:top left');
      });
    });
  });

  describe('_jigsass-bidi [Mixin]', () => {
    it('Calls `_jigsass-bidi-simple` when property has `start` in it', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('margin-start, 20px, false')
        .calls('_jigsass-bidi-simple(margin-start, 20px, false)');
    });

    it('Calls `_jigsass-bidi-simple` when property has `end` in it', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('padding-end, 20px, false')
        .calls('_jigsass-bidi-simple(padding-end, 20px, false)');
    });

    it('Calls `_jigsass-bidi-simple` when values is `start`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('float, start, false')
        .calls('_jigsass-bidi-simple(float, start, false)');
    });

    it('Calls `_jigsass-bidi-simple` when values is `end`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('clear, end, false')
        .calls('_jigsass-bidi-simple(clear, end, false)');
    });

    it('Calls `_jigsass-bidi-direction` when property is `direction`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('direction, ste, false')
        .calls('_jigsass-bidi-direction(ste)');
    });

    it('Calls `_jigsass-bidi-direction` when property is `direction`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('direction, ste, false')
        .calls('_jigsass-bidi-direction(ste)');
    });

    it('Calls `_jigsass-bidi-bdrs` when property is `border-radius`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('border-radius, (10px 12, 8px 7px), false')
        .calls('_jigsass-bidi-bdrs((10px 12, 8px 7px), false)');
    });

    it('Calls `_jigsass-bidi-bgi` when property is `background-image`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('background-image, linear-gradient(to start, red, black), false')
        .calls('_jigsass-bidi-bgi(linear-gradient(to start, red, black))');
    });

    it('Calls `_jigsass-bidi-bgp` when property is `background-position`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('background-position, end 25%, false')
        .calls('_jigsass-bidi-bgp(end 25%, false)');
    });

    it('Calls `_jigsass-bidi-shadow` when property is `box-shadow`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('box-shadow, inset 12px 5px 10px 8px #ccc, false')
        .calls('_jigsass-bidi-shadow(box-shadow, inset 12px 5px 10px 8px #ccc, false)');
    });

    it('Calls `_jigsass-bidi-shadow` when property is `text-shadow`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('text-shadow, 12px 5px 8px #ccc, false')
        .calls('_jigsass-bidi-shadow(text-shadow, 12px 5px 8px #ccc, false)');
    });

    it('Calls `_jigsass-bidi-transform` when property is `transfrom`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('transform, rotate(10deg) translate3d(12px, 0, 0), false')
        .calls('_jigsass-bidi-transform(rotate(10deg) translate3d(12px, 0, 0), false)');
    });

    it('Calls `_jigsass-bidi-transform` when property is `transfrom-origin`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('transform-origin, start 75%, false')
        .calls('_jigsass-bidi-transform-origin(start 75%, false)');
    });

    it('Calls `_jigsass-bidi-sides` when property is a list of numbers and' +
       'property is not one of the above properties', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('margin, 12px 0, false')
        .calls('_jigsass-bidi-sides(margin, 12px 0, false)');
    });

    it('Calls `jigsass-rem` directly when no bidi-related property or values are passed ' +
       'and `$rem` is set to `true`', () => {
      sassaby.includedMixin('_jigsass-bidi')
        .calledWithArgs('font-size, 12px, true')
        .calls('jigsass-rem(font-size, 12px)');
    });
  });

  describe('jigsass-bidi-directon [Mixin]', () => {
    it('Locally changes direction', () => {
      sassaby.includedMixin('jig-noop')
        .calledWithBlock(
          'before: $jigsass-direction;' +
          '@include jigsass-bidi-direction(rtl) {' +
            'during: $jigsass-direction;' +
          '}' +
          'after: $jigsass-direction;'
        )
        .equals('before: ltr; during: rtl; after: ltr;');
    });
  });

  describe('jigsass-bidi [Mixin]', () => {
    it('Calls `_jigsass-bidi`', () => {
      sassaby.includedMixin('jigsass-bidi')
        .calledWithArgs('margin, 12px 0, false, false')
        .calls('_jigsass-bidi(margin, 12px 0, false)');
    });

    it('Calls `jigsass-mq`', () => {
      sassaby.includedMixin('jigsass-bidi')
        .calledWithArgs('margin, 12px 0, large')
        .createsMediaQuery('(min-width:64em)');
    });

    it('Calls `jigsass-mq` correctly when `mq` is `auto`', () => {
      const sassaby = new Sassaby(file, { variables: { 'jigsass-sizes': '(rhythm-unit:(small: 12px))', } })

      sassaby.includedMixin('jigsass-bidi')
        .calledWithArgs('margin, 12px 0, auto')
        .createsMediaQuery('(min-width: 30em)');
    });

    it('Calls `jigsass-mq` correctly when `mq` is `all`', () => {
      const sassaby = new Sassaby(file, {
        variables: { 'jigsass-breakpoints': '(lengths:(xl: 1600px))', }
      });

      sassaby.includedMixin('jigsass-bidi')
        .calledWithArgs('margin, 12px 0, all')
        .createsMediaQuery('(min-width: 100em)');
    });
  });
});
