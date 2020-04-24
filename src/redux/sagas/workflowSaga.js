import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* workflows() {
    yield takeEvery('GET_ALL_WORKFLOWS', getAllWorkflows);
    yield takeEvery('GET_TEAM_WORKFLOWS', getTeamWorkflows);
    yield takeEvery('GET_THIS_WORKFLOW', getThisWorkflow);
    yield takeEvery('ADD_NEW_WORKFLOW', addNewWorkflow);
    yield takeEvery('EDIT_WORKFLOW_NAME', editWorkflowName);
    yield takeEvery('PUBLISH_THIS_WORKFLOW', publishThisWorkflow);
    yield takeEvery('DELETE_THIS_WORKFLOW', deleteThisWorkflow);
    yield takeEvery('GET_THIS_PHASE', getThisPhase);
    yield takeEvery('ADD_NEW_PHASE', addNewPhase);
    yield takeEvery('REMOVE_PHASE', removePhase);
    yield takeEvery('EDIT_PHASE_NAME', editPhaseName);
    yield takeEvery('GET_THIS_TASK', getThisTask);
    yield takeEvery('EDIT_TASK_NAME', editTaskName);
    yield takeEvery('ADD_NEW_TASK', addNewTask);
    yield takeEvery('GET_TASK_OPTIONS', getTaskOptions);
    yield takeEvery('REMOVE_TASK', removeTask);
}

// gets all workflows from DB
function* getAllWorkflows(){
    console.log("We are here in saga GET all workflows");
    const getWorkflows = yield axios.get(`/api/workflow/all`);
    console.log('in saga - all workflows GET back with:', getWorkflows.data);
    yield put({type: 'SET_ALL_WORKFLOWS', payload: getWorkflows.data});
}
//gets all team workflows
function* getTeamWorkflows(action) {
    console.log("We are here in saga GET team workflows", action.payload);
    const getWorkflows = yield axios.get(`/api/workflow/team/${action.payload}`);
    console.log('in saga - all workflows GET back with:', getWorkflows.data);
    yield put({ type: 'SET_TEAM_WORKFLOWS', payload: getWorkflows.data });
}

// gets requested workflow from DB
function* getThisWorkflow(wf){
    console.log("We are here in saga GET this workflow");
    const getWorkflow = yield axios.get(`/api/workflow/requested/${wf.payload.id}`);
    console.log('in saga - GET this workflow back with:', getWorkflow.data);
    yield put({type: 'SET_THIS_WORKFLOW', payload: getWorkflow.data});
    yield put({type: 'CURENT_WORKFLOW', 
    payload: {id: getWorkflow.data[0].wf_id, name: getWorkflow.data[0].wf_name, 
        description: getWorkflow.data[0].wf_desc}});
}

// gets requested phase from DB
function* getThisPhase(phase){
    console.log("We are here in saga GET this phase");
    const getPhase = yield axios.get(`/api/workflow/phase/${phase.payload.id}`);
    console.log('in saga - GET this phase back with:', getPhase.data);
    yield put({type: 'SET_THIS_PHASE', payload: getPhase.data});
    yield put({type: 'CURENT_PHASE', 
    payload: {id: getPhase.data[0].ph_id, name: getPhase.data[0].ph_name, 
        description: getPhase.data[0].ph_description, sequence: getPhase.data[0].ph_sequence}});
}

// gets requested task from DB
function* getThisTask(task){
    console.log("We are here in saga GET this task");
    const getTask = yield axios.get(`/api/workflow/task/${task.payload.id}`);
    console.log('in saga - GET this task back with:', getTask.data);
    yield put({type: 'SET_THIS_TASK', payload: getTask.data});
    yield put({type: 'CURENT_TASK', 
    payload: {id: getTask.data[0].task_id, name: getTask.data[0].task_name, 
        description: getTask.data[0].task_description, sequence: getTask.data[0].task_sequence}});
}

// updates workflow name / description in DB
function* editWorkflowName(name){
    try {
        const editWFName = yield axios.put(`/api/workflow/new-wf-name/${name.payload.id}`, name.payload);
        console.log('in SAGA returning from new wf name PUT', editWFName);
        yield put({type: 'GET_THIS_WORKFLOW', payload: name.payload})
        yield put({type: 'TOGGLE_EDIT_WORKFLOW'});
    } catch(error){
        console.log('error in saga /workflow/new-wf-name:', error);
    }
}

// updates phase name / description in DB
function* editPhaseName(name){
    try {
        const editWFName = yield axios.put(`/api/workflow/new-phase-name/${name.payload.id}`, name.payload);
        console.log('in SAGA returning from new phase name PUT', editWFName);
        yield put({type: 'GET_THIS_WORKFLOW', payload: name.payload});
        yield put({type: 'GET_THIS_PHASE', payload: name.payload.phase});
    } catch(error){
        console.log('error in saga /workflow/new-phase-name:', error);
    }
}

// updates task name / description in DB
function* editTaskName(name){
    try {
        const editTaskName = yield axios.put(`/api/workflow/new-task-name/${name.payload.id}`, name.payload);
        console.log('in SAGA returning from new task name PUT', editTaskName);
        yield put({type: 'GET_THIS_PHASE', payload: name.payload});
        yield put({type: 'GET_THIS_TASK', payload: name.payload.task});
    } catch(error){
        console.log('error in saga /workflow/new-task-name:', error);
    }
}

// add new task to phase
function* addNewTask(name) {
    console.log("in saga add task POST with: ", name.payload);
    try {
        yield axios.post(`/api/workflow/add/task/`, name.payload);
        yield put({type: 'GET_THIS_PHASE', payload: name.payload});
    } catch(error){
        console.log(error);
    }
}

// add new workflow to db
function* addNewWorkflow(wf) {
    console.log("in saga add workflow POST with: ", wf.payload);
    try {
        yield axios.post(`/api/workflow/add/workflow/`, wf.payload);
    } catch(error){
        console.log(error);
    }
}

// add new phase to workflow
function* addNewPhase(phase) {
    console.log("in saga add phase POST with: ", phase.payload);
    try {
        yield axios.post(`/api/workflow/add/phase/`, phase.payload);
        yield put({type: 'GET_THIS_WORKFLOW', payload: phase.payload});
        yield put({type: 'TOGGLE_ADD_PHASE'});
    } catch(error){
        console.log(error);
    }
}

// remove phase from workflow
function* removePhase(remove) {
    console.log("in saga phase DELETE with: ", remove.payload);
    try {
        yield axios.delete(`/api/workflow/remove/phase/${remove.payload.phase.id}`);
        yield put({type: 'GET_THIS_WORKFLOW', payload: remove.payload});
        yield put({type: 'TOGGLE_EDIT_PHASE'});
    } catch(error){
        console.log(error);
    }
}

// remove task from phase
function* removeTask(remove) {
    console.log("in saga phase DELETE with: ", remove.payload);
    try {
        yield axios.delete(`/api/workflow/remove/task/${remove.payload.task.id}`);
        yield put({type: 'GET_THIS_PHASE', payload: remove.payload});
        yield put({type: 'TOGGLE_EDIT_TASK'});
    } catch(error){
        console.log(error);
    }
}

// mark workflow as published in DB
function* publishThisWorkflow(id){
    try {
        const publishWF = yield axios.put(`/api/workflow/publish/${id.payload.id}`);
        console.log('in SAGA returning from publish workflow PUT', publishWF);
        yield put({type: 'GET_ALL_WORKFLOWS'});
        yield put({type: 'GET_TEAM_WORKFLOWS', payload: id.payload.team});
    } catch(error){
        console.log('error in saga /workflow/publish/wf:', error);
    }
}

// remove workflow from dbyield put({type: 'GET_TEAM_WORKFLOWS', payload: remove.payload.team});
function* deleteThisWorkflow(remove) {
    console.log("in saga workflow DELETE with: ", remove.payload);
    try {
        yield axios.delete(`/api/workflow/remove/workflow/${remove.payload.id}`);
        yield put({type: 'GET_ALL_WORKFLOWS'});
        yield put({type: 'GET_TEAM_WORKFLOWS', payload: remove.payload.team});
    } catch(error){
        console.log(error);
    }
}

// gets all task options from DB
function* getTaskOptions(){
    console.log("We are here in saga GET all task options");
    const getOptions = yield axios.get(`/api/workflow/all/task/options`);
    console.log('in saga - all task options GET back with:', getOptions.data);
    yield put({type: 'SET_TASK_OPTIONS', payload: getOptions.data});
}

export default workflows;