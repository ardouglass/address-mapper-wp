/**
 * Status Messages Redux reducer
 * @param {Object} state - The settings Redux state
 * @param {Object} action - The Redux action object triggering this call
 * @param {Object} action.type - The Redux action type
 * @param {Object} action.payload - The data passed with the Redux action
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
