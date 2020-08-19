import { all } from 'redux-saga/effects';
import homeSaga from '@home/store/sagas';

export default function* rootSaga(): Generator {
  yield all([homeSaga()]);
}
