import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import subscriber from './subscriberReducer';


const rootReducer = combineReducers({
    admin,
    client,
    subscriber,
  });
  
  export default rootReducer;