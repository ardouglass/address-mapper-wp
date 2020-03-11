import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';
import http from 'utils/http';
import {addStatusMessage} from 'store/statusMessages/actions';
import {
  getGoogleMapsApiKeySuccess,
  getGoogleMapsApiKeyFailure,
  setGoogleMapsApiKeySuccess,
  setGoogleMapsApiKeyFailure,
} from 'store/settings/actions';

/**
 * Handles all requests to query the Google Maps API key from the server
 * @param {Object} _action - The Redux action object triggering this call
 */
function* watchGetGoogleMapsApiKey(_action) {
  try {
    // Call the API
    const {data} = yield call(http.get, '/settings/google-maps-api-key');
    // Handle success
    yield put(getGoogleMapsApiKeySuccess(data));
  } catch (error) {
    // Handle errors
    const payload = error.response.data;
    yield put(getGoogleMapsApiKeyFailure(payload));
    yield put(addStatusMessage('error', payload.message));
  }
}

/**
 * Handles all requests to update the Google Maps API key on the server
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 * @param {string} action.payload.googleMapsApiKey - The Google Maps API key to send to the server
 */
function* watchSetGoogleMapsApiKey({payload}) {
  try {
    // Call the API
    const {data} = yield call(http.post, '/settings/google-maps-api-key', {
      googleMapsApiKey: payload.googleMapsApiKey,
    });
    // Handle success
    yield put(setGoogleMapsApiKeySuccess(data));
    yield put(addStatusMessage('success', data.message));
  } catch (error) {
    // Handle errors
    const payload = error.response.data;
    yield put(setGoogleMapsApiKeyFailure(payload));
    yield put(addStatusMessage('error', payload.message));
  }
}

/**
 * The root saga for everything grouped under settings
 */
function* settingsSaga() {
  yield takeEvery('GET_GOOGLE_MAPS_API_KEY', watchGetGoogleMapsApiKey);
  yield takeLatest('SET_GOOGLE_MAPS_API_KEY', watchSetGoogleMapsApiKey);
}

export default settingsSaga;
