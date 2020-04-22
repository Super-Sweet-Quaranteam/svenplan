import {takeLatest } from 'redux-saga/effects';
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

function* ProjectSaga() {
    yield takeLatest('CREATE_PROJECT', createProject);
}

export default ProjectSaga;
