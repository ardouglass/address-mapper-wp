import {
  put,
  call,
  all,
  select,
  takeLeading,
  takeLatest,
} from 'redux-saga/effects';
import {chunk} from 'lodash-es';
import httpWP from 'utils/httpWP';
import {addStatusMessage} from 'store/statusMessages/actions';
import {
  completedParsingCSV,
  completedPreparingData,
  beganProcessingFile,
  completedProcessingFile,
  updateProcessingPercentage,
  addAddressesToUploadStack,
  completedGeocoding,
  updateAddressMeta,
} from 'store/addresses/actions';
import {getIds, getReadyToUpload} from 'store/addresses/selectors';
import {getGoogleMapsApiKey} from 'store/settings/selectors';
import parseCSV from 'utils/dataProcessing/parseCSV';
import prepareForGeocoding from 'utils/dataProcessing/prepareForGeocoding';
import {geocodeChunks} from 'utils/dataProcessing/geocodeData';

/**
 * Handles accepted file uploads and parses the CSV
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 */
function* watchAcceptUploadedFiles({payload}) {
  // Let the store know we're processing something now
  yield put(beganProcessingFile());
  yield put(updateProcessingPercentage(1, 'parsing'));

  try {
    // Process the CSV and data
    const {data} = yield call(parseCSV, payload.files[0]);
    // Handle successful CSV parsing
    yield put(completedParsingCSV(data));
  } catch (errors) {
    yield put(completedProcessingFile(false));
    // Display breaking errors
    const errorMessages = errors.map(error =>
      put(addStatusMessage('error', error))
    );
    yield all(errorMessages);
  }
}

/**
 * Handles completed parsing CSV action, and prepares the data for geocoding
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 */
function* watchCompletedParsingCSV({payload}) {
  yield put(updateProcessingPercentage(5, 'preparing'));

  const ids = yield select(getIds);
  const preparedData = yield call(prepareForGeocoding, payload.data, ids);

  // Fire action for accepted data
  if (preparedData.accepted.length) {
    yield put(completedPreparingData(preparedData.accepted));
  } else {
    // No new/readable data to process, so we're done
    yield put(updateProcessingPercentage(100, 'no_new_data'));
    yield put(completedProcessingFile(true));
  }

  // Display rejected warning
  if (preparedData.rejected.length) {
    yield put(
      addStatusMessage(
        'warning',
        `${preparedData.rejected.length} row${
          preparedData.rejected.length === 1 ? '' : 's'
        } skipped due to missing required fields.`
      )
    );
  }

  // Display duplicate info
  if (preparedData.duplicate.length) {
    yield put(
      addStatusMessage(
        'info',
        `${preparedData.duplicate.length} row${
          preparedData.duplicate.length === 1 ? '' : 's'
        } previously processed.`
      )
    );
  }
}

/**
 * Handles data prepared to geocode
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 */
function* watchCompletedPreparingData({payload}) {
  yield put(updateProcessingPercentage(10, 'geocoding'));

  try {
    const googleMapsAPIKey = yield select(getGoogleMapsApiKey);
    const chunkedRows = chunk(payload.data, 25);

    const numChunks = chunkedRows.length;
    let chunksGeocoded = 0;
    let percentComplete = 10; // The first 10% was processing the file
    for (const rows of chunkedRows) {
      const geocodedChunk = yield call(geocodeChunks, rows, googleMapsAPIKey);

      // Put geocoded addresses in the store
      yield put(addAddressesToUploadStack(geocodedChunk));

      // Update percent complete if it has changed
      chunksGeocoded++;
      const newPercentComplete =
        Math.floor((chunksGeocoded / numChunks) * 80) + 10; // The middle 80% is geocoding
      if (newPercentComplete !== percentComplete) {
        percentComplete = newPercentComplete;
        yield put(updateProcessingPercentage(percentComplete));
      }
    }

    // It should be safe to upload the data now
    yield put(completedGeocoding());
  } catch (error) {
    yield put(addStatusMessage('error', error.message));
    yield put(completedProcessingFile(false));
  }
}

/**
 * Handles uploading the geocoded data
 */
function* watchCompletedGeocoding() {
  yield put(updateProcessingPercentage(90, 'uploading'));

  // Get our addresses
  const addresses = yield select(getReadyToUpload);
  // Format our addresses for the endpoint
  const formattedAddresses = addresses.map(({id, lat, lng, ...data}) => ({
    id,
    lat,
    lng,
    data,
  }));

  try {
    const {data} = yield call(httpWP.post, '/points', {
      points: formattedAddresses,
    });

    const meta = {
      lastUpdatedDate: new Date(data.data.lastUpdatedDate * 1000),
      lastUpdatedUser: data.data.lastUpdatedUser,
      ids: formattedAddresses.map(({id}) => id),
    };

    yield put(updateProcessingPercentage(100, 'finished'));
    yield put(completedProcessingFile(true));
    yield put(updateAddressMeta(meta));
  } catch (error) {
    yield put(
      addStatusMessage('error', 'Unable to save to server. Please try again.')
    );
    yield put(completedProcessingFile(false));
  }
}

/**
 * Handles rejected files being uploaded
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 */
function* watchRejectUploadedFiles({payload}) {
  // Handle error

  yield put(addStatusMessage('error', payload.message));
  yield put(completedProcessingFile(false));
}

/**
 * The root saga for everything grouped under addresses
 */
function* addressesSaga() {
  yield takeLeading('ACCEPT_UPLOADED_FILES', watchAcceptUploadedFiles);
  yield takeLatest('REJECT_UPLOADED_FILES', watchRejectUploadedFiles);
  yield takeLatest('COMPLETED_PARSING_CSV', watchCompletedParsingCSV);
  yield takeLatest('COMPLETED_PREPARING_DATA', watchCompletedPreparingData);
  yield takeLatest('COMPLETED_GEOCODING', watchCompletedGeocoding);
}

export default addressesSaga;
