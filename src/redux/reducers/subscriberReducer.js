import { combineReducers } from 'redux';



const existingProjects = (state=[], action) => {
    switch (action.type) {
      case 'SET_EXISTING_PROJECTS':
          return action.payload;
      default:
          return state;
    }
}



export default combineReducers({
    existingProjects,

  });
