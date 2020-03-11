/**
 * Provides a helper for the ADD_STATUS_MESSAGE action
 * @param {('error'|'warning'|'success'|'info')} status - Determines the color of the status message
 * @param {string} message - The message to be displayed
 */
export const addStatusMessage = (status, message) => ({
  type: 'ADD_STATUS_MESSAGE',
  payload: {status, message},
});

/**
 * Provides a helper for the CLEAR_STATUS_MESSAGE action
 * @param {number} index - The status message to delete by it's index
 */
export const clearStatusMessage = index => ({
  type: 'CLEAR_STATUS_MESSAGE',
  payload: {index},
});

/**
 * Provides a helper for the CLEAR_ALL_STATUS_MESSAGES action
 */
export const clearAllStatusMessages = () => ({
  type: 'CLEAR_ALL_STATUS_MESSAGES',
});
