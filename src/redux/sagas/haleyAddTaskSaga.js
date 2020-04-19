import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* workflows() {
    yield takeEvery('SET_PHASE_ID', setPhaseID);

    yield takeEvery('FETCH_RISK_TYPES', setRiskTypes);

    // yield takeEvery('GET_THIS_WORKFLOW', getThisWorkflow);
    // yield takeEvery('ADD_NEW_WORKFLOW', addNewWorkflow);
    // yield takeEvery('EDIT_WORKFLOW_NAME', editWorkflowName);
    // yield takeEvery('PUBLISH_THIS_WORKFLOW', publishThisWorkflow);
    // yield takeEvery('DELETE_THIS_WORKFLOW', deleteThisWorkflow);
    // yield takeEvery('GET_THIS_PHASE', getThisPhase);
    // yield takeEvery('ADD_NEW_PHASE', addNewPhase);
    // yield takeEvery('REMOVE_PHASE', removePhase);
    // yield takeEvery('EDIT_PHASE_NAME', editPhaseName);
    // yield takeEvery('EDIT_TASK_NAME', editTaskName);
    // yield takeEvery('ADD_NEW_TASK', addNewTask);
    // yield takeEvery('GET_TASK_OPTIONS', getTaskOptions);
}

function* setPhaseID (action) {
    yield put({type: 'UPDATE_PHASE_ID', payload: action.payload});
}

function* setRiskTypes (action) {
    const riskTypes = yield axios.get(`/api/haley-task/risktypes/${action.payload}`);
    let riskTypesArray = [];
    for (let i=0; i<riskTypes.data.length; i++){
        // console.log(riskTypes.data[i].riskarea)
        riskTypesArray.push(riskTypes.data[i].riskarea);
    }
    yield put({ type: 'UPDATE_RISKAREA_OPTIONS', payload: riskTypesArray });
}

// // gets all workflows from DB
// function* getAllWorkflows() {
//     console.log("We are here in saga GET all workflows");
//     const getWorkflows = yield axios.get(`/api/workflow/all`);
//     console.log('in saga - all workflows GET back with:', getWorkflows.data);
//     yield put({ type: 'SET_ALL_WORKFLOWS', payload: getWorkflows.data });
// }

// // gets requested workflow from DB
// function* getThisWorkflow(wf) {
//     console.log("We are here in saga GET this workflow");
//     const getWorkflow = yield axios.get(`/api/workflow/requested/${wf.payload.id}`);
//     console.log('in saga - GET this workflow back with:', getWorkflow.data);
//     yield put({ type: 'SET_THIS_WORKFLOW', payload: getWorkflow.data })
// }

// // gets requested phase from DB
// function* getThisPhase(phase) {
//     console.log("We are here in saga GET this phase");
//     const getPhase = yield axios.get(`/api/workflow/phase/${phase.payload.id}`);
//     console.log('in saga - GET this phase back with:', getPhase.data);
//     yield put({ type: 'SET_THIS_PHASE', payload: getPhase.data });
// }

// // updates workflow name / description in DB
// function* editWorkflowName(name) {
//     try {
//         const editWFName = yield axios.put(`/api/workflow/new-wf-name/${name.payload.id}`, name.payload);
//         console.log('in SAGA returning from new wf name PUT', editWFName);
//         yield put({ type: 'GET_THIS_WORKFLOW', payload: name.payload })
//     } catch (error) {
//         console.log('error in saga /workflow/new-wf-name:', error);
//     }
// }

// // updates phase name / description in DB
// function* editPhaseName(name) {
//     try {
//         const editWFName = yield axios.put(`/api/workflow/new-phase-name/${name.payload.id}`, name.payload);
//         console.log('in SAGA returning from new phase name PUT', editWFName);
//         yield put({ type: 'GET_THIS_WORKFLOW', payload: name.payload });
//         yield put({ type: 'GET_THIS_PHASE', payload: name.payload.phase });
//     } catch (error) {
//         console.log('error in saga /workflow/new-phase-name:', error);
//     }
// }

// // updates task name / description in DB
// function* editTaskName(name) {
//     try {
//         const editTaskName = yield axios.put(`/api/workflow/new-task-name/${name.payload.id}`, name.payload);
//         console.log('in SAGA returning from new task name PUT', editTaskName);
//         yield put({ type: 'GET_THIS_PHASE', payload: name.payload });
//     } catch (error) {
//         console.log('error in saga /workflow/new-task-name:', error);
//     }
// }

// // add new task to task
// function* addNewTask(name) {
//     console.log("in saga add task POST with: ", name.payload);
//     try {
//         yield axios.post(`/api/workflow/add/task/`, name.payload);
//         yield put({ type: 'GET_THIS_PHASE', payload: name.payload });
//     } catch (error) {
//         console.log(error);
//     }
// }

// // add new workflow to db
// function* addNewWorkflow(wf) {
//     console.log("in saga add workflow POST with: ", wf.payload);
//     try {
//         yield axios.post(`/api/workflow/add/workflow/`, wf.payload);
//     } catch (error) {
//         console.log(error);
//     }
// }

// // add new phase to workflow
// function* addNewPhase(phase) {
//     console.log("in saga add phase POST with: ", phase.payload);
//     try {
//         yield axios.post(`/api/workflow/add/phase/`, phase.payload);
//         yield put({ type: 'GET_THIS_WORKFLOW', payload: phase.payload });
//     } catch (error) {
//         console.log(error);
//     }
// }

// // remove phase from workflow
// function* removePhase(remove) {
//     console.log("in saga phase DELETE with: ", remove.payload);
//     try {
//         yield axios.delete(`/api/workflow/remove/phase/${remove.payload.phase.id}`);
//         yield put({ type: 'GET_THIS_WORKFLOW', payload: remove.payload });
//         yield put({ type: 'GET_THIS_PHASE', payload: remove.payload.phase });
//     } catch (error) {
//         console.log(error);
//     }
// }

// // mark workflow as published in DB
// function* publishThisWorkflow(id) {
//     try {
//         const publishWF = yield axios.put(`/api/workflow/publish/${id.payload.id}`);
//         console.log('in SAGA returning from publish workflow PUT', publishWF);
//         yield put({ type: 'GET_ALL_WORKFLOWS' });
//     } catch (error) {
//         console.log('error in saga /workflow/publish/wf:', error);
//     }
// }

// // remove workflow from db
// function* deleteThisWorkflow(remove) {
//     console.log("in saga workflow DELETE with: ", remove.payload);
//     try {
//         yield axios.delete(`/api/workflow/remove/workflow/${remove.payload.id}`);
//         yield put({ type: 'GET_ALL_WORKFLOWS' });
//     } catch (error) {
//         console.log(error);
//     }
// }

// // gets all task options from DB
// function* getTaskOptions() {
//     console.log("We are here in saga GET all task options");
//     const getOptions = yield axios.get(`/api/workflow/all/task/options`);
//     console.log('in saga - all task options GET back with:', getOptions.data);
//     yield put({ type: 'SET_TASK_OPTIONS', payload: getOptions.data });
// }

export default workflows;