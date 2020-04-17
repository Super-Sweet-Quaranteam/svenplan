import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// root saga for this file. function*'s should be found in same order as they are in this root saga
function* SubscriberProjects(){
    yield takeEvery('FETCH_EXISTING_PROJECTS', fetchExistingProjects)
    yield takeEvery('FETCH_CURRENT_WORKFLOW', fetchCurrentWorkflow)
    yield takeEvery('FETCH_PHASES_TASKS', fetchPhasesTasks)
}
// gets all projects belonging to one user
function* fetchExistingProjects(){
    try {        
        const response = yield axios.get('/subscriber/existing-projects')        
        yield put({type: 'SET_EXISTING_PROJECTS', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}
// gets specific project workflow when user chooses which among their projects to continue
function* fetchCurrentWorkflow(){
    try {        
        const response = yield axios.get('/subscriber/current-workflow/phases')
        yield put({type: 'SET_CURRENT_PROJECT', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}
// gets specific tasks per phase, when phase block is clicked
function* fetchPhasesTasks(action){
    try {
        yield console.log('stop trying to make fetch a thing');
        // pass in params to target the clicked phases' tasks
        const response = yield axios.get('/subscriber/current-workflow/phases/tasks/'+ action.payload.phaseId)
        yield console.log('response.data is ', response.data);
        yield put({type: 'SET_TASKS_IN_PHASE', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

export default SubscriberProjects;