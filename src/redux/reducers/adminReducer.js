import { combineReducers } from 'redux';





const clientList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_LIST':
            return action.payload;
        default:
            return state;
    }
}


  export default combineReducers({
    clientList,

  });