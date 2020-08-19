import CONSTANTS from '@home/store/constants';
import { put, takeLatest } from 'redux-saga/effects';
import actions from '@home/store/actions';
import { fetchUserDetailService, fetchUserPhotos } from '@home/store/services';
import { logError } from '@src/common/utils';

export function* fetchUserDetails(action: {
  type: string;
  payload: string;
}): Generator {
  try {
    yield put(actions.setLoading(true));
    const response = yield fetchUserDetailService(action.payload);
    yield put(actions.setUserDetails(response.results));
    yield put(actions.setLoading(false));
  } catch (error) {
    logError(error);
  }
}

export function* getUserPhotos(action: {
  type: string;
  payload: string;
}): Generator {
  try {
    yield put(actions.setLoading(true));
    const response = yield fetchUserPhotos(action.payload);
    yield put(actions.setUserPhotos(response));
    yield put(actions.setLoading(false));
  } catch (error) {
    logError(error);
  }
}

function* watcherSaga(): Generator {
  yield takeLatest(CONSTANTS.SEARCH_USERNAME, fetchUserDetails);
  yield takeLatest(CONSTANTS.GET_USER_PHOTOS, getUserPhotos);
}
export default watcherSaga;
