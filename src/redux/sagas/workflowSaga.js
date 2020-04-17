import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* workflows() {
    yield takeEvery('GET_ALL_WORKFLOWS', getAllWorkflows);
    yield takeEvery('GET_THIS_WORKFLOW', getThisWorkflow);
}


// gets all workflows from DB
function* getAllWorkflows(){
    console.log("We are here in saga GET all workflows");
    const getWorkflows = yield axios.get(`/api/workflow/all`);
    console.log('in saga - all workflows GET back with:', getWorkflows.data);
    yield put({type: 'SET_ALL_WORKFLOWS', payload: getWorkflows.data})
}

// gets requested workflow from DB
function* getThisWorkflow(wf){
    console.log("We are here in saga GET this workflow");
    const getWorkflow = yield axios.get(`/api/workflow/requested/${wf.payload.id}`);
    console.log('in saga - GET this workflow back with:', getWorkflow.data);
    yield put({type: 'SET_THIS_WORKFLOWS', payload: getWorkflow.data})
}

export default workflows;