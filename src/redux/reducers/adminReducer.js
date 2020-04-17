import { combineReducers } from 'redux';

const newWorkflow = (state = [], action) => {
  switch (action.type) {
      case 'ADD_WORKFLOW':
          return action.payload;
      default:
          return state;
  }
}

const newPhase = (state = [], action) => {
  switch (action.type) {
      case 'ADD_PHASE':
          return state = [...state, action.payload];
      case 'ADD_TASK':
          return state = [...state, action.payload];
      default:
          return state;
  }
}


const clientList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT_LIST':
            return action.payload;
        default:
            return state;
    }
}

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
    newWorkflow,
    newPhase,
    adminDisplay

  });