import {
  fetchTranslation,
  watchfetchTranslation
} from '@store/sagas/translation';
import { IApiError, IResponse } from '@basket/store/types';
import { put, takeLatest } from 'redux-saga/effects';
import actions from '@store/actions/translation';
import translationState from '@store/states/translation';

describe('Configuration Saga', () => {
  it('fetchConfiguration saga test', () => {
    const fetchTranslationGenerator = fetchTranslation({
      type: '',
      payload: {
        oneApp:  true
      }
    });
    const setCMSTranslation: Promise<
      IResponse | Error
    > = fetchTranslationGenerator.next().value;
    setCMSTranslation
      .then((success: IResponse | Error) => {
        expect(success).toBeDefined();
      })
      .catch((error: IApiError) => {
        expect(error).toBeDefined();
      });

    expect(fetchTranslationGenerator.next(translationState()).value).toEqual(
      put(actions.setCMSTranslation(translationState()))
    );
    expect(fetchTranslationGenerator.next().value).toBeUndefined();
  });

  it('watchfetchTranslation saga test', () => {
    const watchfetchTranslationGenerator = watchfetchTranslation();
    expect(watchfetchTranslationGenerator.next().value).toEqual(
      takeLatest('FETCH_TRANSLATION_REQUESTED', fetchTranslation)
    );
    expect(watchfetchTranslationGenerator.next().value).toBeUndefined();
  });
});
