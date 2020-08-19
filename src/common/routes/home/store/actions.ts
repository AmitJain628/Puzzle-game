import { actionCreator } from '@src/common/utils/actionCreator';
import CONSTANTS from '@home/store/constants';

export default {
  setLoading: actionCreator<boolean>(CONSTANTS.SET_LOADING)
};
