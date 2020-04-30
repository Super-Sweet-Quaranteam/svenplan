import { combineReducers } from 'redux';


// gets full alert list for admin
const alertList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALERT_LIST':
            return action.payload;
        default:
            return state;
    }
}


  export default combineReducers({
    alertList,
    
  });