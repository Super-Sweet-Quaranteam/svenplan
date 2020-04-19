import { combineReducers } from 'redux';


const taskInProgress = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PHASE_ID':
            return {...state, phaseId: action.payload}
        // case 'SET_USER':
        //     return action.payload;
        // case 'UNSET_USER':
        //     return {};
        default:
            return state;
    }
};


export default combineReducers({
    taskInProgress,
});

