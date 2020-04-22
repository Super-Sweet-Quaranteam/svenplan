import { combineReducers } from 'redux';


const taskInProgress = (state = {}, action) => {
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
        default:
            return state;
    }
};

const stepOfTaskCreation = (state = 1, action) => {
    switch (action.type) {
        case 'NEXT_TASK_STEP':
            return state+1;
        case 'PREVIOUS_TASK_STEP':
            return state-1;
        default:
            return state;
    }
};

const confirmation = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TASK_CONFIRM':
            return {message: `task successfully added to default_tasks table, with an id of ${action.payload}`, id: action.payload};
        default:
            return state;
    }
};

const assignedTask = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ASSIGNED_TASK':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    taskInProgress,
    confirmation,
    assignedTask,
    stepOfTaskCreation,
});

