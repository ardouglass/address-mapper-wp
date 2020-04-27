/**
 * Addresses Redux reducer
 * @param {Object} state - The addresses Redux state
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 * @returns {Object} The new addresses state for the Redux store
 */
function addressesReducer(state = {}, {type, payload}) {
  switch (type) {
    case 'RESET_UPLOADER':
      return {
        ...state,
        processing: {
          ...state.processing,
          errorsProcessing: false,
          currentlyProcessing: false,
          percentComplete: 0,
          processingState: '',
        },
      };

    case 'BEGAN_PROCESSING_FILE':
      return {
        ...state,
        processing: {
          ...state.processing,
          errorsProcessing: false,
          currentlyProcessing: true,
          percentComplete: 0,
          processingState: '',
        },
      };

    case 'COMPLETED_PROCESSING_FILE':
      return {
        ...state,
        readyToUpload: [],
        processing: {
          ...state.processing,
          errorsProcessing: !payload.successful,
        },
      };

    case 'UPDATE_PROCESSING_PERCENTAGE':
      return {
        ...state,
        processing: {
          ...state.processing,
          processingState: payload.processingState.length
            ? payload.processingState
            : state.processing.processingState,
          percentComplete: payload.percentComplete,
        },
      };

    case 'ADD_ADDRESSES_TO_UPLOAD_STACK':
      return {
        ...state,
        readyToUpload: [...state.readyToUpload, ...payload.addresses],
      };

    case 'UPDATE_ADDRESS_META':
      return {
        ...state,
        lastUpdatedDate: payload.meta.lastUpdatedDate,
        lastUpdatedUser: payload.meta.lastUpdatedUser,
        ids: [...state.ids, ...payload.meta.ids],
      };

    default:
      return state;
  }
}

export default addressesReducer;
