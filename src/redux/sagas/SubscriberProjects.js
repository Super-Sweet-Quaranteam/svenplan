import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* SubscriberProjects(){
    yield takeEvery('FETCH_EXISTING_PROJECTS', fetchExistingProjects)
}

function* fetchExistingProjects(){
    try {
        yield console.log('stop trying to make fetch a thing');
        
        const response = yield axios.get('/subscriber/existing-projects')
        yield console.log('back from server with ', response.data);
          
        // yield put({type: '', payload: response.data})
    } catch (error) {
        console.log(error);
    }
}

export default SubscriberProjects;