import { combineReducers } from 'redux';
  
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


export default combineReducers({
    newPhase,
    allWorkflows,
    thisWorkflow,
    thisPhase

  });