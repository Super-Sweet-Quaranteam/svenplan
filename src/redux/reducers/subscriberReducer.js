import { combineReducers } from 'redux';

const existingProjects = (state=[], action) => {
    switch (action.type) {
      case 'SET_EXISTING_PROJECTS':
          return action.payload;
      default:
          return state;
    }
}

const currentProject = (state=[], action) => {
    switch (action.type) {
      case 'SET_CURRENT_PROJECT':
          return action.payload;
      default:
          return state;
    }
}

const tasksInPhase = (state=[], action) => {
    switch (action.type) {
      case 'SET_TASKS_IN_PHASE':
          return action.payload;
      default:
          return state;
    }
}

export default combineReducers({
    existingProjects,
    currentProject,
    tasksInPhase,
  });
