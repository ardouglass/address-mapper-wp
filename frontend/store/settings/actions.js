/*
 * Action creators
 */
function getGoogleMapsApiKey({status, payload}) {
  console.log(payload);
  switch (status) {
    case 'success':
      return {
        type: 'GET_GOOGLE_MAPS_API_KEY_SUCCESS',
        payload,
      };
    case 'failure':
      return {
        type: 'GET_GOOGLE_MAPS_API_KEY_FAILURE',
        payload,
      };
    default:
      return {type: 'GET_GOOGLE_MAPS_API_KEY'};
  }
}

function setGoogleMapsApiKey({status, payload}) {
  switch (status) {
    case 'success':
      return {
        type: 'SET_GOOGLE_MAPS_API_KEY_SUCCESS',
        payload,
      };
    case 'failure':
      return {
        type: 'SET_GOOGLE_MAPS_API_KEY_FAILURE',
        payload,
      };
    default:
      return {
        type: 'SET_GOOGLE_MAPS_API_KEY',
        payload,
      };
  }
}

export {getGoogleMapsApiKey, setGoogleMapsApiKey};
