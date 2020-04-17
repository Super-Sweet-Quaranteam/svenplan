import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import subscriber from './subscriberReducer';
import user from './userReducer';
import workflow from './workflowReducer';



const rootReducer = combineReducers({
    admin,
    client,
    subscriber,
    user,
    workflow,
  });
  
  export default rootReducer;