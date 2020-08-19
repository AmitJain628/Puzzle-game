import { configurationAction } from '@store/actions';
import constants from '@store/constants/configuration';
import configuration from '@store/states/configuration';

describe('configuration actions', () => {
  it('setCMSConfiguration action creator should return a object payload', () => {
    const expectedAction = {
      type: constants.SET_CMS_CONFIGURATION_DATA,
      payload: configuration().cms_configuration
    };
    expect(
      configurationAction.setCMSConfiguration(configuration().cms_configuration)
    ).toEqual(expectedAction);
  });
});
