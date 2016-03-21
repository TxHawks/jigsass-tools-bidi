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
});
