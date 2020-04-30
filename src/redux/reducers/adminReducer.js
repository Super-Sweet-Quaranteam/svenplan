import { combineReducers } from 'redux';

// gets full client list for admin
const clientList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_LIST':
            return action.payload;
        default:
            return state;
    }
}

// currently not being used
const adminDisplay = (state = {}, action) => {
  switch (action.type) {
    case 'ADMIN_DISPLAY':
      return action.payload;
    default:
      return state;
  }
}



  export default combineReducers({
    clientList,
    adminDisplay

  });