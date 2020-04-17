import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchTeams() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/teams', config); 
    let teamArray = response.data;
    for (let i=0; i<teamArray.length; i++){
      let members = yield axios.get(`/api/teams/members/${teamArray[i].id}`, config);
      teamArray[i]={...teamArray[i], members:members.data}
    }

    yield put({ type: 'SET_TEAMS', payload: teamArray });
  } catch (error) {
    console.log('Team get request failed', error);
  }
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
}

export default teamSaga;
