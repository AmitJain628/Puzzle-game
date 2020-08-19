import CONSTANTS from '@home/store/constants';
import initialState from '@home/store/state';
import withProduce from '@utils/withProduce';
import { AnyAction, Reducer } from 'redux';
import { IHomeState, IUserDetails, IUserPhotos } from '@home/store/types';

const reducers = {
  [CONSTANTS.SET_LOADING]: (state: IHomeState, payload: boolean) => {
    state.isLoading = payload;
  },
  [CONSTANTS.SET_USERDETAILS]: (state: IHomeState, payload: IUserDetails[]) => {
    state.userDetails = payload;
  },
  [CONSTANTS.SET_USER_PHOTOS]: (state: IHomeState, payload: IUserPhotos[]) => {
    state.userPhotos = payload;
  },
  [CONSTANTS.SET_INITAL_STATE]: (state: IHomeState) => {
    state.userPhotos = [];
    state.userDetails = [];
  },
};

export default withProduce(initialState, reducers) as Reducer<
  IHomeState,
  AnyAction
>;
