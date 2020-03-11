/**
 * Provides a helper for the GET_GOOGLE_MAPS_API_KEY action
 * @returns {Object} The GET_GOOGLE_MAPS_API_KEY action
 */
export const getGoogleMapsApiKey = () => ({type: 'GET_GOOGLE_MAPS_API_KEY'});

/**
 * Provides a helper for the GET_GOOGLE_MAPS_API_KEY_SUCCESS action
 * @param {Object} payload - The payload to pass along in the action
 * @param {string} payload.code - The response code
 * @param {string} payload.message - The response message
 * @param {Object} payload.data - The data from the response
 * @param {string} payload.data.status - The HTTP status code
 * @param {string} payload.data.googleMapsApiKey - The Google Maps API key
 * @returns {Object} The GET_GOOGLE_MAPS_API_KEY_SUCCESS action
 */
export const getGoogleMapsApiKeySuccess = payload => ({
  type: 'GET_GOOGLE_MAPS_API_KEY_SUCCESS',
  payload,
});

/**
 * Provides a helper for the GET_GOOGLE_MAPS_API_KEY_FAILURE action
 * @param {Object} payload - The payload to pass along in the action
 * @param {string} payload.code - The response code
 * @param {string} payload.message - The response message
 * @param {Object} payload.data - The data from the response
 * @param {string} payload.data.status - The HTTP status code
 * @returns {Object} The GET_GOOGLE_MAPS_API_KEY_FAILURE action
 */
export const getGoogleMapsApiKeyFailure = payload => ({
  type: 'GET_GOOGLE_MAPS_API_KEY_FAILURE',
  payload,
});

/**
 * Provides a helper for the SET_GOOGLE_MAPS_API_KEY action
 * @param {Object} payload - The payload to pass along in the action
 * @param {string} payload.googleMapsApiKey - The new Google Maps API key to send to the server
 * @returns {Object} The SET_GOOGLE_MAPS_API_KEY action
 */
export const setGoogleMapsApiKey = payload => ({
  type: 'SET_GOOGLE_MAPS_API_KEY',
  payload,
});

/**
 * Provides a helper for the SET_GOOGLE_MAPS_API_KEY_SUCCESS action
 * @param {Object} payload - The payload to pass along in the action
 * @param {string} payload.code - The response code
 * @param {string} payload.message - The response message
 * @param {Object} payload.data - The data from the response
 * @param {string} payload.data.status - The HTTP status code
 * @returns {Object} The SET_GOOGLE_MAPS_API_KEY_SUCCESS action
 */
export const setGoogleMapsApiKeySuccess = payload => ({
  type: 'SET_GOOGLE_MAPS_API_KEY_SUCCESS',
  payload,
});

/**
 * Provides a helper for the SET_GOOGLE_MAPS_API_KEY_FAILURE action
 * @param {Object} payload - The payload to pass along in the action
 * @param {string} payload.code - The response code
 * @param {string} payload.message - The response message
 * @param {Object} payload.data - The data from the response
 * @param {string} payload.data.status - The HTTP status code
 * @returns {Object} The SET_GOOGLE_MAPS_API_KEY_FAILURE action
 */
export const setGoogleMapsApiKeyFailure = payload => ({
  type: 'SET_GOOGLE_MAPS_API_KEY_FAILURE',
  payload,
});
