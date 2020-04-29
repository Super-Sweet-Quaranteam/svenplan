import { combineReducers } from 'redux';

// used for store current reducer
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

// stores progress while creating a new task
const taskInProgress = (state = {
    phaseId: null,
    riskareaOptions: [],
    title: '',
    sequence: null,
    riskareas: [],
    description: '',
    links: [],
    inputs: []
}, action) => {
    switch (action.type) {
        case 'UPDATE_PHASE_ID':
            return {...state, phaseId: action.payload}
        case 'UPDATE_RISKAREA_OPTIONS':
            return { ...state, riskareaOptions: action.payload };
        case 'UPDATE_TASK_TITLE':
            return { ...state, title: action.payload };
        case 'UPDATE_TASK_SEQUENCE':
            return { ...state, sequence: action.payload };
        case 'UPDATE_TASK_RISKAREAS':
            return {...state, riskareas: action.payload};
        case 'UPDATE_TASK_DESCRIPTION':
            return {...state, description: action.payload};
        case 'UPDATE_TASK_LINKS':
            if (state.links){return {...state, links: [...state.links, action.payload]}}
            else{ return { ...state, links: [action.payload]}};
        case 'UPDATE_TASK_INPUTS':
            if (state.inputs) { return { ...state, inputs: [...state.inputs, action.payload] } }
            else { return { ...state, inputs: [action.payload] } };
        case 'CLEAR_TASK_FIELDS':
            return state = {...state.phaseId, riskareaOptions: [], title: '', sequence: null, 
            riskareas: [], description: '',links: [], inputs: []}
        default: 
            return state;
    }
};

// steps of new task creation
const stepOfTaskCreation = (state = 1, action) => {
    switch (action.type) {
        case 'NEXT_TASK_STEP':
            return state+1;
        case 'PREVIOUS_TASK_STEP':
            return state-1;
        case 'GO_HOME_STEP':
            return state = 1;   
        default:
            return state;
    }
};

// sets confirmation
const confirmation = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TASK_CONFIRM':
            return {message: `task successfully added to default_tasks table, with an id of ${action.payload}`, id: action.payload};
        default:
            return state;
    }
};

// stores assigned task
const assignedTask = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ASSIGNED_TASK':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    storeCurent,
    allWorkflows,
    thisWorkflow,
    thisPhase,
    thisTask,
    taskOptions,
    teamWorkflows,
    taskInProgress,
    confirmation,
    assignedTask,
    stepOfTaskCreation,
  });


