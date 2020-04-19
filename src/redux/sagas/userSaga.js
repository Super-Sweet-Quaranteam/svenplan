import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    const teamResponse = yield axios.get('/api/user/team', config);    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: {...response.data, team: teamResponse.data} });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_SELECTED_USER" actions
function* fetchSelectedUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get(`/api/user/selected/${action.payload}`, config);
    const teamResponse = yield axios.get(`/api/user/team/${action.payload}`, config);
    yield put({ type: 'SET_SELECTED_USER', payload: { ...response.data, team: teamResponse.data } });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      userInfo: action.payload
    };
    const response = yield axios.put(`/api/user/${action.payload.id}`, config);
    console.log(response)
  } catch (error) {
    console.log('User update request failed', error);
  }
}

function* editAccess(action) {
  console.log(action.payload, 'edit actionp')
  let sendLevel = 3
  if(action.payload.level ===3){
    sendLevel=2
  };
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      level: sendLevel
    };
    const response = yield axios.put(`/api/user/access/${action.payload.id}`, config);
    console.log(response)
    yield put({ type: 'GET_CLIENT_LIST'})
  } catch (error) {
    console.log('User access update request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_CURRENT_USER', fetchUser);
  yield takeLatest('FETCH_SELECTED_USER', fetchSelectedUser);
  yield takeLatest('UPDATE_CURRENT_USER', updateUser);
  yield takeLatest('EDIT_ACCESS', editAccess);


}

export default userSaga;
