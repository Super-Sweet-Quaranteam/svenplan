import { combineReducers } from 'redux';


const storeCurent = (state = {}, action) => {
    switch (action.type) {
        case 'CURENT_WORKFLOW':
            return state = {...state, workflow: action.payload};
        case 'CURENT_PHASE':
            return state = {...state, phase: action.payload};
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
    storeCurent,
    allWorkflows,
    thisWorkflow,
    thisPhase,
    taskOptions
  });