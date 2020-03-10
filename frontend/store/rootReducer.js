import {combineReducers} from 'redux';
import settingsReducer from 'store/settings/reducer';
import statusMessagesReducer from 'store/statusMessages/reducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
  statusMessages: statusMessagesReducer,
});

export default rootReducer;
