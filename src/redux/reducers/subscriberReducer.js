import { combineReducers } from 'redux';

// holds current user existing projects
const existingProjects = (state=[], action) => {
    switch (action.type) {
      case 'SET_EXISTING_PROJECTS':
          return action.payload;
      default:
          return state;
    }
}

// holds the specific project client wants to view
const currentProject = (state=[], action) => {
    switch (action.type) {
      case 'SET_CURRENT_PROJECT':
          return action.payload;
      default:
          return state;
    }
}

// holds project data
const projectData = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECT_DATA':
            return action.payload;
        default:
            return state;
    }
}

// stores id of the project client chooses
const projectId = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECT_ID':
            return action.payload;
        default:
            return state;
    }
}

// stores the order of tasks to be displayed as user proceeds through workflow
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
    projectId,
    projectData
  });
