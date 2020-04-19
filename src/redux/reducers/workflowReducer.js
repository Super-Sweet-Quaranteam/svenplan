import { combineReducers } from 'redux';
  
////////////////////////////////////////////may be able to remove reducer
///////////////////////////////////////////only used in AddPhase.js which isnt a used component
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
  
// gets all existing workflows
const allWorkflows = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_WORKFLOWS':
            return action.payload;
        default:
            return state;
    }
}

// gets requested workflow
const thisWorkflow = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_WORKFLOW':
            return action.payload;
        default:
            return state;
    }
}

// gets requested phase tasks
const thisPhase = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_PHASE':
            return action.payload;
        default:
            return state;
    }
}

// gets all task options
const taskOptions = (state = [], action) => {
    switch (action.type) {
        case 'SET_TASK_OPTIONS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    newPhase,
    allWorkflows,
    thisWorkflow,
    thisPhase,
    taskOptions
  });