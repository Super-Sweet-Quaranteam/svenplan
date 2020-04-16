import { all } from 'redux-saga/effects';
import clientList from './clientListSaga';
import SubscriberProjects from './SubscriberProjects'
export default function* rootSaga() {
    yield all([
      clientList(),
      SubscriberProjects()
    ]);
  }