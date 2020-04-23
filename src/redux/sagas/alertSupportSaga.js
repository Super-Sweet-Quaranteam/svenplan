import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* alerts() {
    yield takeEvery('GET_ALERT_LIST', getAlertList);
    yield takeEvery('MARK_RESOLVED', markResolved);
    yield takeEvery('SUBMIT_ALERT', submitAlert);
}



// gets alert list from DB
function* getAlertList(){
    console.log("We are here in saga GET all Alerts");
    const getList = yield axios.get(`/api/alert/list/all`);
    console.log('in saga - alert list GET back with:', getList.data);
    yield put({type: 'SET_ALERT_LIST', payload: getList.data});
}

// updates alert to resolved status
function* markResolved(alert){
    try {
        const resolveAlert = yield axios.put(`/api/alert/resolve/${alert.payload}`);
        console.log('in SAGA returning from resolve alert PUT', resolveAlert);
        yield put({type: 'GET_ALERT_LIST'});
    } catch(error){
        console.log('error in saga resolve alert:', error);
    }
}

// submit new alert to db
function* submitAlert(alert) {
    console.log("in saga submit alert POST with: ", alert.payload);
    try {
        yield axios.post(`/api/alert/new`, alert.payload);
    } catch(error){
        console.log(error);
    }
}


export default alerts;