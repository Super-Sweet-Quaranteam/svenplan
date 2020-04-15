import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';



const rootReducer = combineReducers({
    admin,
    client,

  });
  
  export default rootReducer;