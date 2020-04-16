import { all } from 'redux-saga/effects';
import clientList from './clientListSaga';

export default function* rootSaga() {
    yield all([
      clientList(),
      
    ]);
  }