import { combineReducers } from 'redux';

// stores current user information upon loging in
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

// used to grab user information by admin in teams.js
const selectedUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_USER':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  currentUser,
  selectedUser,
});

