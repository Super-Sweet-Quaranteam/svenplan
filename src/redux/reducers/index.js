import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import user from './userReducer';



const rootReducer = combineReducers({
    admin,
    client,
    user,
  });
  
  export default rootReducer;