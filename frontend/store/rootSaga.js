import {all} from 'redux-saga/effects';
import settingsSaga from 'store/settings/saga';

/**
 * The root saga that runs all Redux sagas
 */
function* rootSaga() {
  yield all([settingsSaga()]);
}

export default rootSaga;
