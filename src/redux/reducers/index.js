import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
import subscriber from './subscriberReducer';
import user from './userReducer';
import teams from './teamReducer';
import workflow from './workflowReducer';
import errors from './errorsReducer';




const rootReducer = combineReducers({
    admin,
    client,
    subscriber,
    user,
    teams,
// sweetalerts,
    workflow,
    errors,
  });
  
  export default rootReducer;