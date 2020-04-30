import { combineReducers } from 'redux';

// stores task details to be used in project details .js
const taskDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TASK_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  taskDetails,
});

