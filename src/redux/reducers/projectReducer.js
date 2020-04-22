import { combineReducers } from 'redux';


const taskDetails = (state = {}, action) => {
  switch (action.type) {
    case 'UNSET_TASK_DETAILS':
      return {};
    case 'SET_TASK_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  taskDetails,
});

