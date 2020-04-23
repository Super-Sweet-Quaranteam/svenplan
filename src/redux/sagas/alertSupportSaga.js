import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* alerts() {
    yield takeEvery('GET_ALERT_LIST', getAlertList);
   
}



// gets alert list from DB
function* getAlertList(){
    console.log("We are here in saga GET all Alerts");
    const getList = yield axios.get(`/api/alert/list/all`);
    console.log('in saga - alert list GET back with:', getList.data);
    yield put({type: 'SET_ALERT_LIST', payload: getList.data});
}


export default alerts;