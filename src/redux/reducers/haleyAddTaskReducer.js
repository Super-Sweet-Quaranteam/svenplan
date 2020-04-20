import { combineReducers } from 'redux';


const taskInProgress = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PHASE_ID':
            return {...state, phaseId: action.payload}
        case 'UPDATE_RISKAREA_OPTIONS':
            return { ...state, riskareaOptions: action.payload };
        case 'UPDATE_TASK_TITLE':
            return { ...state, title: action.payload };
        case 'UPDATE_TASK_RISKAREAS':
            return {...state, riskareas: action.payload};
        case 'UPDATE_TASK_DESCRIPTION':
            return {...state, description: action.payload};
        default:
            return state;
    }
};


export default combineReducers({
    taskInProgress,
});

