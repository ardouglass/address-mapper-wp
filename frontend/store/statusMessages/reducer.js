/**
 * Reducer for all status messages to display in the global message area.
 */
function statusMessagesReducer(state = [], {type, payload}) {
  switch (type) {
    case 'ADD_STATUS_MESSAGE':
      return [...state, payload];
    case 'CLEAR_STATUS_MESSAGE':
      const newState = [...state];
      newState.splice(payload.index, 1);
      return newState;
    case 'CLEAR_ALL_STATUS_MESSAGES':
      return [];
    default:
      return state;
  }
}

export default statusMessagesReducer;
