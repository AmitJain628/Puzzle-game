import { translationAction } from '@store/actions';
import constants from '@store/constants/translation';
import translationState from '@store/states/translation';

describe('translation actions', () => {
  it('setCMSTranslation action creator should return a object with payload', () => {
    const expectedAction = {
      type: constants.SET_CMS_TRANSLATION_DATA,
      payload: translationState()
    };
    expect(translationAction.setCMSTranslation(translationState())).toEqual(
      expectedAction
    );
  });
});
