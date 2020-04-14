import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

const clientDisplay = (state={}, action) => {
  switch (action.type) {
    case 'CLIENT_DISPLAY':
        return action.payload;
    default:
        return state;
  }
}

const reducerB = (state = {}, action) => {
  return state;
}
 
const store = createStore(
  combineReducers({
    clientDisplay,
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


