import { combineReducers } from 'redux';


const projectDetails = (state = {}, action) => {
  switch (action.type) {
    case 'UNSET_PROJECT_DETAILS':
      return {};
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  projectDetails,
});

