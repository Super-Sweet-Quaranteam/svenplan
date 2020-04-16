import { combineReducers } from 'redux';



const clientDisplay = (state={}, action) => {
    switch (action.type) {
      case 'CLIENT_DISPLAY':
          return action.payload;
      default:
          return state;
    }
}



export default combineReducers({
    clientDisplay,

  });