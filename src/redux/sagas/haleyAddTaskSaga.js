import axios from 'axios'
import { takeEvery, put } from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* tasks() {
    yield takeEvery('SET_TASK_PHASE_ID', setTaskPhaseID);
    yield takeEvery('FETCH_TASK_RISK_TYPES', setTaskRiskareaOptions);
    yield takeEvery('SET_TASK_TITLE', setTaskTitle);
    yield takeEvery('SET_TASK_RISKAREAS', setTaskRiskareas);
    yield takeEvery('SET_TASK_DESCRIPTION', setTaskDescription);

    yield takeEvery('ADD_TASK_LINK', addTaskLink);
    yield takeEvery('ADD_TASK_INPUT', addTaskInput);

    yield takeEvery('ADD_TASK_TO_DATABASE', addTaskToDatabase);
    yield takeEvery('ADD_TASK_TO_SUBSCRIBER_DATABASE', addTaskToSubscriberDatabase);

    yield takeEvery('FETCH_ASSIGNED_TASK', fetchAssignedTask);
}
function* setTaskPhaseID (action) {
    yield put({type: 'UPDATE_PHASE_ID', payload: action.payload});
}
function* setTaskRiskareaOptions(action) {
    const riskTypes = yield axios.get(`/api/haley-task/riskareas/${action.payload}`);
    let riskTypesArray = [];
    for (let i = 0; i < riskTypes.data.length; i++) {
        // console.log(riskTypes.data[i].riskarea)
        riskTypesArray.push(riskTypes.data[i]);
    }
    yield put({ type: 'UPDATE_RISKAREA_OPTIONS', payload: riskTypesArray });
}
function* setTaskTitle(action) {
    yield put({ type: 'UPDATE_TASK_TITLE', payload: action.payload });
}
function* setTaskRiskareas(action) {
    yield put({ type: 'UPDATE_TASK_RISKAREAS', payload: action.payload });
}
function* setTaskDescription(action) {
    yield put({ type: 'UPDATE_TASK_DESCRIPTION', payload: action.payload });
}
function* addTaskLink(action) {
    yield put({ type: 'UPDATE_TASK_LINKS', payload: action.payload });
} 
function* addTaskInput(action) {
    yield put({ type: 'UPDATE_TASK_INPUTS', payload: action.payload });
}
function* addTaskToDatabase(action) {
    try {
        const postResponse = yield axios.post(`/api/haley-task/add-new-task`, action.payload);
        console.log('postResponse:', postResponse);
        yield put({ type: 'ADD_TASK_CONFIRM', payload: postResponse.data.newTaskId });
    } catch (error) {
        console.log('error with posting new task:', error);
    }
}
function* addTaskToSubscriberDatabase(action) {
    try {
        const postResponse = yield axios.post(`/api/haley-task/add-new-assigned-task`, action.payload);
        console.log('postResponse:', postResponse);
        yield put({ type: 'ADD_TASK_CONFIRM', payload: postResponse.data.newTaskId });
    } catch (error) {
        console.log('error with posting new task:', error);
    }
}
function* fetchAssignedTask(action) {
    try {
        const response = yield axios.get(`/api/haley-task/assigned-task/${action.payload.id}`);
        console.log('response:', response);
        yield put({ type: 'SET_ASSIGNED_TASK', payload: response.data });
    } catch (error) {
        console.log('error with posting new task:', error);
    }
}

export default tasks;