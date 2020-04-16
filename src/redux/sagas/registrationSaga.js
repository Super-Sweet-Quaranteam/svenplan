import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//Haley cleared all the registration/login error stuff, because we don't have an errors reducer

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    console.log('made it to registerUser with payload:', action.payload);
    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);
    // automatically log a user in after registration
    // this will need to be changed when there's more registration info to just email and pw
    yield put({ type: 'LOGIN', payload: action.payload });
  } catch (error) {
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

// watcher Saga: intercepts 'REGISTER' actions
function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
