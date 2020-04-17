import { combineReducers } from 'redux';

const newWorkflow = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WORKFLOW':
            return action.payload;
        default:
            return state;
    }
}
  
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
        case 'SET_THIS_WORKFLOWS':
            return action.payload;
        default:
            return state;
    }
}



export default combineReducers({
    newWorkflow,
    newPhase,
    allWorkflows,
    thisWorkflow

  });