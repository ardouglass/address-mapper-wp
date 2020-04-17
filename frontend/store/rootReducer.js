import {combineReducers} from 'redux';
import addressesReducer from 'store/addresses/reducer';
import settingsReducer from 'store/settings/reducer';
import statusMessagesReducer from 'store/statusMessages/reducer';

const rootReducer = combineReducers({
  addresses: addressesReducer,
  settings: settingsReducer,
  statusMessages: statusMessagesReducer,
});

export default rootReducer;
