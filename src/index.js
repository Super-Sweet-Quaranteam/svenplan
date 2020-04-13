import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

const reducerA = (state={}, action) => {
  return state;
}

const reducerB = (state = {}, action) => {
  return state;
}
 
const store = createStore(
  combineReducers({
    reducerA,
    reducerB
  }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


