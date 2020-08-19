import { actionCreator } from '@src/common/utils/actionCreator';
import CONSTANTS from '@home/store/constants';
import { IUserDetails } from '@home/store/types';

export default {
  setLoading: actionCreator<boolean>(CONSTANTS.SET_LOADING),
  setUserDetails: actionCreator<IUserDetails>(CONSTANTS.SET_USERDETAILS),
  setUsername: actionCreator<string>(CONSTANTS.SEARCH_USERNAME),
  setUserPhotos: actionCreator<string>(CONSTANTS.SET_USER_PHOTOS),
  getUserPhotos: actionCreator<string>(CONSTANTS.GET_USER_PHOTOS),
  setIntialState: actionCreator<void>(CONSTANTS.SET_INITAL_STATE),
};
