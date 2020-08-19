import { commonAction } from '@store/actions';

import { actionConstants as constants } from '../../constants';

describe('common actions', () => {
  it('showError action creator should payload with custom error', () => {
    const expectedAction = {
      type: constants.SHOW_API_ERROR,
      payload: 'Some Error'
    };
    expect(commonAction.showError('Some Error')).toEqual(expectedAction);
  });
  it('removeError action creator should remove remove set error', () => {
    const expectedAction = {
      type: constants.REMOVE_API_ERROR,
      payload: undefined
    };
    expect(commonAction.removeError()).toEqual(expectedAction);
  });
  it('showLoader action creator should set error and loading', () => {
    const expectedAction = {
      type: 'ESHOP_REMOVE_LOADER',
      payload: undefined
    };
    expect(commonAction.removeLoader()).toEqual(expectedAction);
  });
});
