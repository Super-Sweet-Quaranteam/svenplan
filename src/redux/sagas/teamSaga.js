import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

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

function* createTeam(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      teamName:action.payload
    };

    const response = yield axios.post('/api/teams', config);
    let teamArray = response.data;

    yield put({ type: 'SET_TEAMS', payload: teamArray });
  } catch (error) {
    console.log('Team get request failed', error);
  }
}

function* updateUserTeam(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      teamName: action.payload
    };
    //first update the user info
    yield axios.put('/api/teams/join', config);
    //then update the user reducer
    yield put({ type: 'FETCH_CURRENT_USER' });
  } catch (error) {
    console.log('Team get request failed', error);
  }
}

function* teamSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('CREATE_TEAM', createTeam);
  yield takeLatest('UPDATE_USER_TEAM', updateUserTeam)
}

export default teamSaga;
