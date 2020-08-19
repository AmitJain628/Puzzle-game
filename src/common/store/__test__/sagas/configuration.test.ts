import {
  fetchConfiguration,
  watchfetchConfiguration
} from '@store/sagas/configuration';
import { IApiError, IResponse } from '@basket/store/types';
import { put, takeLatest } from 'redux-saga/effects';
import actions from '@store/actions/configuration';
import configurationState from '@store/states/configuration';

describe('Configuration Saga', () => {
  it('fetchConfiguration saga test', () => {
    const fetchConfigurationGenerator = fetchConfiguration({
      type: '',
      payload: {
        oneApp: true
      }
    });
    const setCMSConfiguration: Promise<
      IResponse | Error
    > = fetchConfigurationGenerator.next().value;
    setCMSConfiguration
      .then((success: IResponse | Error) => {
        expect(success).toBeDefined();
      })
      .catch((error: IApiError) => {
        expect(error).toBeDefined();
      });

    expect(
      fetchConfigurationGenerator.next(configurationState().cms_configuration)
        .value
    ).toEqual(
      put(actions.setCMSConfiguration(configurationState().cms_configuration))
    );
  });

  it('watchfetchConfiguration saga test', () => {
    const watchfetchConfigurationGenerator = watchfetchConfiguration();
    expect(watchfetchConfigurationGenerator.next().value).toEqual(
      takeLatest('FETCH_CONFIGURATION_REQUESTED', fetchConfiguration)
    );
    expect(watchfetchConfigurationGenerator.next().value).toBeUndefined();
  });
});
