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
    // teamArray is an array of all team objects
    let teamArray = response.data;
    // each team object has a team name and a team id.
    // but we want to also send back the members of each team
    // loop through team array and use the id of each team to match with members
    // then add members to the team object
    for (let i=0; i<teamArray.length; i++){
      let members = yield axios.get(`/api/teams/members/${teamArray[i].id}`, config);
      teamArray[i]={...teamArray[i], members:members.data}
    }
    // now we're sending back team info including members to the teamReducer
    yield put({ type: 'SET_TEAMS', payload: teamArray });
  } catch (error) {
    console.log('Team get request failed', error);
  }
}

function* teamSaga() {
  //FETCH_TEAMS fetches all teams and their respective members
  yield takeLatest('FETCH_TEAMS', fetchTeams);
}

export default teamSaga;
