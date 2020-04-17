import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import subscriber from './subscriberReducer';
import user from './userReducer';
import errors from './errorsReducer';



const rootReducer = combineReducers({
    admin,
    client,
    subscriber,
    user,
    errors,
  });
  
  export default rootReducer;