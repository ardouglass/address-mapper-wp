const initialState = {
  googleMapsApiKey: addressMapperApiSettings.googleMapsApiKey || '',
};

function settingsReducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'GET_GOOGLE_MAPS_API_KEY_SUCCESS':
      return Object.assign({}, state, {
        googleMapsApiKey: payload.googleMapsApiKey,
      });
    case 'SET_GOOGLE_MAPS_API_KEY_SUCCESS':
      return Object.assign({}, state, {
        googleMapsApiKey: payload.googleMapsApiKey,
      });
    default:
      return state;
  }
}

export default settingsReducer;
