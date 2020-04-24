import {put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* createProject(action) {
    try {

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            details: action.payload,
            
        };
        yield axios.post('/subscriber/project', config);
  
    } catch (error) {
        console.log('Error create project:', error);

    }
}


function* saveProject(action) {
    try {
        yield console.log(action.payload, 'this is my action.payload')
        Object.keys(action.payload.values).map(key => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            details: {id:action.payload.projectId, key:Number(key), value: action.payload.values[key] }

        };
     axios.post('/subscriber/project/values', config);
    })
        } catch (error) {
        console.log('Error create project:', error);

    }
}

function* fetchInformationToDisplay(action) {
    let defaultTaskId= action.payload.defaultTaskId;
  
    try {
        //we'll bundle all info up into an object for the reducer
        let taskDetailsObject = {}
        //use that id to first get basic info, and add it to the details object
        const infoFromDefaultTable = yield axios.get(`/api/project/task/default-info/${defaultTaskId}`);
        taskDetailsObject = infoFromDefaultTable.data[0];
        //then get link info
        const infoFromLinksTable = yield axios.get(`/api/project/task/link-info/${defaultTaskId}`);
        taskDetailsObject={...taskDetailsObject, links: infoFromLinksTable.data}
        //then get input info
        const infoFromInputsTable = yield axios.get(`/api/project/task/input-info/${defaultTaskId}`);
        taskDetailsObject = { ...taskDetailsObject, inputs: infoFromInputsTable.data }
        //then get risk info (if any)
        const infoFromRiskTables = yield axios.get(`/api/project/task/risk-info/${defaultTaskId}`);
        taskDetailsObject = { ...taskDetailsObject, riskareas: infoFromRiskTables.data }
        //then put in reducer
        yield put({ type: 'SET_TASK_DETAILS', payload: taskDetailsObject });
    } catch (error) {
        console.log('error with getting task info:', error);
    }
    
}

function* ProjectSaga() {
    yield takeLatest('CREATE_PROJECT', createProject);
    yield takeLatest('SAVE_INPUTS', saveProject);
    yield takeLatest('FETCH_INFORMATION_TO_DISPLAY', fetchInformationToDisplay);
}

export default ProjectSaga;
