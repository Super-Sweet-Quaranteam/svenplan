import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './redux/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';


const sagaMiddleware = createSagaMiddleware();

// removes logger for development
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];
 

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewareList)
);


sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


