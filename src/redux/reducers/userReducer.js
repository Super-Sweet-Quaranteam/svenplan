import { combineReducers } from 'redux';

// this is how the client side knows there is a user and who they are
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

// selectedUser would be if you wanted to see the profile of the user who isn't you
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

