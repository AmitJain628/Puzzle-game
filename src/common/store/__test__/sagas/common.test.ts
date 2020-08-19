import watcherSaga, {
  fetchIdentityVerificationDetails,
  fetchMegaMenu,
  fetchUserProfile,
  goToNextPossibleRoute,
  verifyUserIdentity,
  verifyUserIdentityUsingOtp
} from '@store/sagas/common';
import { IApiError, IResponse } from '@basket/store/types';
import * as identityVerificationProvidersApi from '@common/types/api/identityVerification/identityVerificationProviders';
import * as verifyUserUsingOtpApi from '@common/types/api/identityVerification/validateUserUsingOtp';
import constants from '@store/constants/actionConstants';

describe('Common Saga', () => {
  it('watcherSaga saga test', () => {
    const generator = watcherSaga();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeUndefined();
  });

  it('fetchMegaMenu saga test', () => {
    const fetchConfigurationGenerator = fetchMegaMenu();
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
    expect(fetchConfigurationGenerator.next().value).toBeUndefined();
  });

  it('fetchUserProfile saga test', () => {
    const generator = fetchUserProfile();
    const setCMSConfiguration: Promise<IResponse | Error> = generator.next()
      .value;
    setCMSConfiguration
      .then((success: IResponse | Error) => {
        expect(success).toBeDefined();
      })
      .catch((error: IApiError) => {
        expect(error).toBeDefined();
      });
    expect(generator).toBeDefined();
  });

  it('fetchIdentityVerificationDetails saga test', () => {
    const generator = fetchIdentityVerificationDetails();
    const setCMSConfiguration: Promise<IResponse | Error> = generator.next()
      .value;
    setCMSConfiguration
      .then((success: IResponse | Error) => {
        expect(success).toBeDefined();
      })
      .catch((error: IApiError) => {
        expect(error).toBeDefined();
      });
    expect(generator).toBeDefined();
  });

  it('goToNextPossibleRoute saga test', () => {
    const generator = goToNextPossibleRoute();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeUndefined();
  });

  it('verifyUserIdentityUsingOtp saga test', () => {
    const payload: {
      type: string;
      payload: verifyUserUsingOtpApi.POST.IRequest;
    } = {
      type: constants.VERIFY_USER_USING_OTP,
      payload: {
        action: 'string',
        mobileNumber: 'string',
        nonce: 'string',
        otp: 'string',
        otpContext: 'string'
      }
    };
    const generator = verifyUserIdentityUsingOtp(payload);
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeUndefined();
  });

  it('verifyUserIdentity saga test', () => {
    const payload: {
      type: string;
      payload: identityVerificationProvidersApi.POST.IRequest;
    } = {
      type: constants.VERIFY_USER_IDENTITY,
      payload: {
        providerId: 'string',
        bankId: 'string',
        providerType: 'string',
        serviceId: 'string'
      }
    };
    const generator = verifyUserIdentity(payload);
    expect(generator.next().value).toBeDefined();
    expect(generator.next().value).toBeUndefined();
  });
});
