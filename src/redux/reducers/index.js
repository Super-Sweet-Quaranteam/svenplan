import { combineReducers } from 'redux';
import admin from './adminReducer';
import client from './clientReducer';
<<<<<<< HEAD
import subscriber from './subscriberReducer';
=======
import user from './userReducer';

>>>>>>> master


const rootReducer = combineReducers({
    admin,
    client,
<<<<<<< HEAD
    subscriber,
=======
    user,
>>>>>>> master
  });
  
  export default rootReducer;