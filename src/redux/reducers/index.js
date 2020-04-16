import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import subscriber from './subscriberReducer';
import user from './userReducer';



const rootReducer = combineReducers({
    admin,
    client,
    subscriber,
    user,
  });
  
  export default rootReducer;