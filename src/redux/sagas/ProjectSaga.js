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
    //we'll bundle all info up into an object for the reducer
    let projectDetailsObject = {}
    //use that id to first get basic info, and add it to the details object
    
}

function* ProjectSaga() {
    yield takeLatest('CREATE_PROJECT', createProject);

    yield takeLatest('FETCH_INFORMATION_TO_DISPLAY', fetchInformationToDisplay);
}

export default ProjectSaga;
