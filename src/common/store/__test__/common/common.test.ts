import { getCheckoutState, getConfiguration } from '@src/common/store/common';

describe('common', () => {
  it('getCheckoutState ::', () => {
    const expectedAction = getCheckoutState();
    expect(getCheckoutState()).toEqual(expectedAction);
  });

  it('getConfiguration ::', () => {
    const expectedAction = getConfiguration();
    expect(getConfiguration()).toEqual(expectedAction);
  });
});
