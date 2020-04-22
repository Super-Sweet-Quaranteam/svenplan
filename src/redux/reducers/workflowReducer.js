import { combineReducers } from 'redux';

const initialState = {
    workflow:{},
    editWorkflow:false,
    phase:{},
    editPhase:false,
    addPhase:false,
    showPhase: false,
    task:{},
    editTask:false,
    addTask:false,
    showTask:false
}

// stores currently viewed workflow info
const storeCurent = (state = initialState, action) => {
    switch (action.type) {
        case 'CURENT_WORKFLOW':
            return state = {...state, workflow: action.payload};
        case 'TOGGLE_EDIT_WORKFLOW':
            return state = {...state, editWorkflow: !state.editWorkflow};
        case 'CURENT_PHASE':
            return state = {...state, phase: action.payload};
        case 'TOGGLE_EDIT_PHASE':
            return state = {...state, editPhase: !state.editPhase};
        case 'TOGGLE_ADD_PHASE':
            return state = {...state, addPhase: !state.addPhase};  
        case 'TOGGLE_SHOW_PHASE':
            return state = {...state, showPhase: !state.showPhase}; 
        case 'CURENT_TASK':
            return state = {...state, task: action.payload};
        case 'TOGGLE_EDIT_TASK':
            return state = {...state, editTask: !state.editTask};
        case 'TOGGLE_ADD_TASK':
            return state = {...state, addTask: !state.addTask};
        case 'TOGGLE_SHOW_TASK':
            return state = {...state, showTask: !state.showTask};   
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
// gets all team workflows
const teamWorkflows = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAM_WORKFLOWS':
            return action.payload;
        default:
            return state;
    }
}

// gets requested workflow w/ phases
const thisWorkflow = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_WORKFLOW':
            return action.payload;
        default:
            return state;
    }
}

// gets requested phase w/ tasks
const thisPhase = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_PHASE':
            return action.payload;
        default:
            return state;
    }
}

// gets requested tasks w/ options
const thisTask = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_TASK':
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
    thisTask,
    taskOptions,
    teamWorkflows
  });