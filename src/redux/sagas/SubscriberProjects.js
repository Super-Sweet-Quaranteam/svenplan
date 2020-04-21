import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// root saga for this file. function*'s should be found in same order as they are in this root saga
function* SubscriberProjects(){
    yield takeEvery('FETCH_EXISTING_PROJECTS', fetchExistingProjects)
    yield takeEvery('FETCH_CURRENT_WORKFLOW', fetchCurrentWorkflow)
    yield takeEvery('FETCH_PHASES_TASKS', fetchPhasesTasks)
}
// gets all projects belonging to one user
function* fetchExistingProjects(action){
    try { 
        console.log('did team number come thru', action.payload);
               
        const response = yield axios.get('/subscriber/existing-projects/'+ action.payload)        
        yield put({type: 'SET_EXISTING_PROJECTS', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}
// gets specific project workflow when user chooses which among their projects to continue
function* fetchCurrentWorkflow(action){
    try {                
        const response = yield axios.get('/subscriber/current-workflow/phases/'+ action.payload)
        yield put({type: 'SET_CURRENT_PROJECT', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}
// gets specific tasks per phase, when phase block is clicked
function* fetchPhasesTasks(action){
    try {        
        // pass in params to target the clicked phases' tasks
        const response = yield axios.get('/subscriber/current-workflow/phases/tasks/'+ action.payload.phaseId)
        yield console.log('response.data is ', response.data);
        yield put({type: 'SET_TASKS_IN_PHASE', payload: response.data})
        // function passed in from payload is called below, 
        // when ran, the function sets the local state of the component it belongs in
        // using info passed to reduxState from code directly above 
        yield action.payload.callback()
    } catch (error) {
        console.log(error);
    }
}

export default SubscriberProjects;