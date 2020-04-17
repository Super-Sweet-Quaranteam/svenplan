import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* SubscriberProjects(){
    yield takeEvery('FETCH_EXISTING_PROJECTS', fetchExistingProjects)
    yield takeEvery('FETCH_CURRENT_WORKFLOW', fetchCurrentWorkflow)
    yield takeEvery('FETCH_PHASES_TASKS', fetchPhasesTasks)
}

function* fetchExistingProjects(){
    try {        
        const response = yield axios.get('/subscriber/existing-projects')        
        yield put({type: 'SET_EXISTING_PROJECTS', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

function* fetchCurrentWorkflow(){
    try {        
        const response = yield axios.get('/subscriber/current-workflow/phases')
        yield put({type: 'SET_CURRENT_PROJECT', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

function* fetchPhasesTasks(action){
    try {
        yield console.log('stop trying to make fetch a thing', action.payload.phaseId);
        
        const response = yield axios.get('/subscriber/current-workflow/phases/tasks/'+ action.payload.phaseId)
        yield console.log('response.data is ', response.data);
        // yield put({type: 'SET_CURRENT_PROJECT', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

export default SubscriberProjects;