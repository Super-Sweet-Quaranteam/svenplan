import { put, takeLatest } from 'redux-saga/effects';
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




        // console.log('infoFromLinksTable:', infoFromLinksTable.data);



        console.log('taskDetailsObject:', taskDetailsObject);

        


        // assignedTaskObject = firstResponse[0];
        // const secondResponse = yield axios.get(`/api/haley-task/assigned-task/inputs/${action.payload.id}`);
        // console.log('second response:', secondResponse);
        //get all the things from the other tables and bundle into one task object that subscriber dom can render from 



        // yield put({ type: 'SET_ASSIGNED_TASK', payload: response.data });
    } catch (error) {
        console.log('error with getting task info:', error);
    }
    
}

function* ProjectSaga() {
    yield takeLatest('CREATE_PROJECT', createProject);

    yield takeLatest('FETCH_INFORMATION_TO_DISPLAY', fetchInformationToDisplay);
}

export default ProjectSaga;
