import common from '@store/reducers/common';
import commonState from '@store/states/common';
import actions from '@store/actions/common';
import { ICommonState, ILoading } from '@store/types/common';
import { IThirdPartyVerificaation, IUserDetails } from '@common/store/types';
import { IMenusCategory } from '@src/common/store/types/common';

// tslint:disable-next-line: no-big-function
describe('Common Reducer', () => {
  const definedAction: { type: string } = { type: '' };
  let initialStateValue: ICommonState = common(undefined, definedAction);
  let expectedState: ICommonState = commonState();

  const initializeValue = () => {
    initialStateValue = common(commonState(), definedAction);
    expectedState = commonState();
  };
  beforeEach(() => {
    initializeValue();
  });

  it('initial state', () => {
    expect(initialStateValue).toMatchSnapshot();
  });

  it('SHOW_API_ERROR should mutate clear basket loading and error in state', () => {
    const action = actions.showError('Some error');
    const mutation: ILoading = {
      errorToast: { isOpen: true, message: 'Some error' },
      isLoggedIn: false,
      isLoginButtonClicked: false,
      loading: false,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('REMOVE_API_ERROR should mutate clear basket loading and error in state', () => {
    const action = actions.removeError();
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: false,
      isLoginButtonClicked: false,
      loading: false,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SHOW_LOADER should mutate loading parameter in state', () => {
    const action = actions.showLoader();
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: false,
      isLoginButtonClicked: false,
      loading: true,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('REMOVE_LOADER should mutate loading parameter in state', () => {
    const action = actions.removeLoader();
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: false,
      isLoginButtonClicked: false,
      loading: false,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_IF_LOGIN_BUTTON_CLICK should mutate loading parameter in state', () => {
    const action = actions.setIfLoginButtonClicked(true);
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: false,
      isLoginButtonClicked: true,
      loading: false,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('ROUTE_TO_LOGIN_FROM_BASKET should mutate loading parameter in state', () => {
    const action = actions.routeToLoginFromBasket(true);
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: false,
      isLoginButtonClicked: false,
      loading: false,
      routeFromBasketToLogin: true
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('IS_USER_LOGGED_IN should mutate loading parameter in state', () => {
    const action = actions.isUserLoggedIn(true);
    const mutation: ILoading = {
      errorToast: { isOpen: false, message: '' },
      isLoggedIn: true,
      isLoginButtonClicked: false,
      loading: false,
      routeFromBasketToLogin: false
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_MSISDN_HEADER should mutate msisdnValue parameter in state', () => {
    const action = actions.setMsisdnHeader('string');
    const mutation: { msisdnValue: string } = { msisdnValue: 'string' };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_MEGA_MENU should mutate loading parameter in state', () => {
    const params: { megaMenu: { categories: IMenusCategory[] } } = {
      megaMenu: {
        categories: []
      }
    };
    const action = actions.setMegaMenu(params);
    const mutation: { megaMenu?: IMenusCategory[]; msisdnValue?: string } = {
      megaMenu: undefined,
      msisdnValue: ''
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_PROLONGATION_AUTHORIZATION_TOKEN should mutate currency parameter in state', () => {
    const action = actions.setProlongationAuthorizationToken('23x43434cxcs');
    const mutation: { prolongation: { authorizationToken: string } } = {
      prolongation: {
        authorizationToken: '23x43434cxcs'
      }
    };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_CURRENCY_VALUE should mutate currency parameter in state', () => {
    const action = actions.setCurrency('USD');
    const mutation: { currency: string } = { currency: 'USD' };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_USER_DETAILS should mutate currency parameter in state', () => {
    const userDetails: IUserDetails = {
      id: 'string',
      status: 'string',
      relatedParties: [
        {
          id: 'string',
          role: 'string',
          name: 'string'
        }
      ],
      contactMediums: [
        {
          type: 'string',
          role: {
            name: 'string'
          },
          medium: {
            emailAddress: 'string',
            number: 'string'
          },
          preferred: true
        }
      ]
    };
    const action = actions.setUserDetails(userDetails);
    const mutation: { userDetails: IUserDetails } = { userDetails };
    const expected: ICommonState = { ...expectedState, ...mutation };
    const state = common(initialStateValue, action);
    expect(state).toEqual(expected);
  });

  it('SET_IDENTITY_VERIFICATION_DETAILS should mutate currency parameter in state', () => {
    const thirdPartyVerificaation: IThirdPartyVerificaation = {
      verificationRequired: true,
      identificationProviders: {
        COURIER: {
          providerType: 'string',
          providerSublist: [
            {
              providerId: 'string',
              bankId: 'string',
              displayValue: 'string'
            }
          ]
        },
        BANK: {
          providerType: 'string',
          providerSublist: [
            {
              providerId: 'string',
              bankId: 'string',
              displayValue: 'string'
            }
          ]
        },
        TELEKOM: {
          providerType: 'string',
          providerSublist: [
            {
              providerId: 'string',
              bankId: 'string',
              displayValue: 'string'
            }
          ]
        }
      }
    };
    const action = actions.setIdentityVerificationDetails(
      thirdPartyVerificaation
    );
    const state = common(initialStateValue, action);
    expect(state).toBeDefined();
  });
});
