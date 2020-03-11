/**
 * Settings Redux reducer
 * @param {Object} state - The settings Redux state
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
 */
function settingsReducer(state = {}, {type, payload}) {
  switch (type) {
    case 'GET_GOOGLE_MAPS_API_KEY_SUCCESS':
      return Object.assign({}, state, {
        googleMapsApiKey: payload.data.googleMapsApiKey,
      });

    case 'SET_GOOGLE_MAPS_API_KEY_SUCCESS':
      return Object.assign({}, state, {
        googleMapsApiKey: payload.data.googleMapsApiKey,
      });

    default:
      return state;
  }
}

export default settingsReducer;
