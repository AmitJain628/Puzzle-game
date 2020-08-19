import rootSaga from '@store/sagas';
describe('Root Saga', () => {
  it('fetchConfiguration saga test', () => {
    expect(rootSaga()).toBeDefined();
  });
  it('fetchConfiguration saga test', () => {
    const fetchTranslationGenerator = rootSaga();
    expect(fetchTranslationGenerator.next().value).toBeDefined();
    expect(fetchTranslationGenerator.next().value).toBeUndefined();
  });
});
