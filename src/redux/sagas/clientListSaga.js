import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* clientList() {
    yield takeEvery('GET_CLIENT_LIST', getClientList);
   
}


// gets client list from DB
function* getClientList(){
    console.log("We are here in saga GET all Client List");
    const getList = yield axios.get(`/api/admin/client-list`);
    console.log('in saga - client list GET back with:', getList.data);
    yield put({type: 'SET_CLIENT_LIST', payload: getList.data})
}


export default clientList;