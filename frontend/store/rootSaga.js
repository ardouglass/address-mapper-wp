import {all} from 'redux-saga/effects';
import addressesSaga from 'store/addresses/saga';
import settingsSaga from 'store/settings/saga';

/**
 * The root saga that runs all Redux sagas
 */
function* rootSaga() {
  yield all([addressesSaga(), settingsSaga()]);
}

export default rootSaga;
