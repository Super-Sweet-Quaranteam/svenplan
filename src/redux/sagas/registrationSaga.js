import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//I took out parts about errors and login mode because we didn't copy over the reducers for them
//might be good to add in, later

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);
    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
