import configuration from '@store/reducers/configuration';
import configurationState from '@store/states/configuration';
import actions from '@store/actions/configuration';
import { IConfigurationState } from '@store/types/configuration';

describe('Configuration Reducer', () => {
  const definedAction: { type: string } = { type: '' };
  let initialStateValue: IConfigurationState = configuration(
    undefined,
    definedAction
  );

  const initializeValue = () => {
    initialStateValue = configuration(configurationState(), definedAction);
  };
  beforeEach(() => {
    initializeValue();
  });

  it('initial state', () => {
    expect(initialStateValue).toMatchSnapshot();
  });

  it('setCMSConfiguration should add a configuration state', () => {
    const action = actions.setCMSConfiguration(
      configurationState().cms_configuration
    );
    const state = configuration(initialStateValue, action);
    expect(state).toEqual(configurationState());
  });
});
