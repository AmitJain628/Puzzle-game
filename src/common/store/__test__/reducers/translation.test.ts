import translation from '@store/reducers/translation';
import translationState from '@store/states/translation';
import { ITranslationState } from '@store/types/translation';
import actions from '@store/actions/translation';

describe('Configuration Reducer', () => {
  const definedAction: { type: string } = { type: '' };
  let initialStateValue: ITranslationState = translation(
    undefined,
    definedAction
  );

  const initializeValue = () => {
    initialStateValue = translation(translationState(), definedAction);
  };
  beforeEach(() => {
    initializeValue();
  });

  it('initial state', () => {
    expect(initialStateValue).toMatchSnapshot();
  });

  it('setCMSConfiguration should add a configuration state', () => {
    const action = actions.setCMSTranslation(translationState());
    const state = translation(initialStateValue, action);
    expect(state).toEqual(translationState());
  });
});
