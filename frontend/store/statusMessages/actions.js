/*
 * Actions for all status messages.
 */
function addStatusMessage(payload) {
  return {type: 'ADD_STATUS_MESSAGE', payload};
}

function clearStatusMessage(payload) {
  return {type: 'CLEAR_STATUS_MESSAGE', payload};
}

function clearAllStatusMessages() {
  return {type: 'CLEAR_ALL_STATUS_MESSAGES'};
}

export {addStatusMessage, clearStatusMessage, clearAllStatusMessages};
