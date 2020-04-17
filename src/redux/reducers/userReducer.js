import { combineReducers } from 'redux';


const currentUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const selectedUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_USER':
      return action.payload;
    case 'UNSET_SELECTED_USER':
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  currentUser,
  selectedUser,
});

