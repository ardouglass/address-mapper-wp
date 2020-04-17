import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {initialState} from 'store/hydrator';
import configureIcons from 'utils/configureIcons';
import App from './App';

configureIcons();
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('address-mapper-hook')
);
