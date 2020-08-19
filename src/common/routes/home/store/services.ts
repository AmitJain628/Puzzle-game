import { IResponse } from '@home/store/types';
import apiCaller from '@common/utils/apiCaller';

export const fetchUserDetailService = async (
  payload: string
): Promise<IResponse> => {
  const url = (check: string) => `${check}`;
  try {
    return await apiCaller.get(url(payload));
    // tslint:disable-next-line:no-useless-catch
  } catch (e) {
    throw e;
  }
};

// tslint:disable-next-line:no-identical-functions
export const fetchUserPhotos = async (payload: string): Promise<IResponse> => {
  const url = (check: string) => `${check}`;
  try {
    return await apiCaller.get(url(payload));
    // tslint:disable-next-line:no-useless-catch
  } catch (e) {
    throw e;
  }
};
