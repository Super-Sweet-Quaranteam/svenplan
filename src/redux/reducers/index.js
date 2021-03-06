import { combineReducers } from 'redux';
import admin from './adminReducer';
import subscriber from './subscriberReducer';
import user from './userReducer';
import teams from './teamReducer';
import workflow from './workflowReducer';
import errors from './errorsReducer';
import project from './projectReducer';
import alerts from './alertReducer';


const rootReducer = combineReducers({
    admin,
    subscriber,
    user,
    teams,
    alerts,
    workflow,
    errors,
    project

  });
  
  export default rootReducer;