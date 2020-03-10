import {all} from 'redux-saga/effects';
import settingsSaga from 'store/settings/saga';

function* rootSaga() {
  yield all([settingsSaga()]);
}

export default rootSaga;
