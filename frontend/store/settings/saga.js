import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import http from 'utils/http';
import {getGoogleMapsApiKey, setGoogleMapsApiKey} from 'store/settings/actions';
import {addStatusMessage} from 'store/statusMessages/actions';
import {camelCase, mapKeys} from 'lodash-es';

function* watchGetGoogleMapsApiKey() {
  try {
    const response = yield call(http.get, '/settings/google-maps-api-key');
    const data = mapKeys(response.data, (_val, key) => camelCase(key));

    yield put(getGoogleMapsApiKey({status: 'success', payload: data}));
  } catch (error) {
    const message = error.response.data.message;
    yield put(getGoogleMapsApiKey({status: 'failure', error: message}));
    yield put(addStatusMessage({status: 'error', message}));
  }
}

function* watchSetGoogleMapsApiKey({payload}) {
  try {
    const response = yield call(http.post, '/settings/google-maps-api-key', {
      'google-maps-api-key': payload.googleMapsApiKey,
    });
    const data = mapKeys(response.data, (_val, key) => camelCase(key));

    yield put(setGoogleMapsApiKey({status: 'success', payload: data}));
    yield put(
      addStatusMessage({
        status: 'success',
        message: 'Successfully updated Google Maps API Key.',
      })
    );
  } catch (error) {
    const message = error.response.data.message;
    yield put(setGoogleMapsApiKey({status: 'failure', error: message}));
    yield put(addStatusMessage({status: 'error', message}));
  }
}

function* settingsSaga() {
  yield takeEvery('GET_GOOGLE_MAPS_API_KEY', watchGetGoogleMapsApiKey);
  yield takeLatest('SET_GOOGLE_MAPS_API_KEY', watchSetGoogleMapsApiKey);
}

export default settingsSaga;
