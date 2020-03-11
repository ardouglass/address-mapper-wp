import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'store/rootReducer';
import rootSaga from 'store/rootSaga';

/**
 * Configures the Redux store
 * @param {Object} preloadedState - The initial Redux state for the application to hydrate
 */
function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = composeWithDevTools({
    name: 'Address Mapper',
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
