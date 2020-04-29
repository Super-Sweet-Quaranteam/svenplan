import { all } from 'redux-saga/effects';

import clientList from './clientListSaga';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import teamSaga from './teamSaga';
import SubscriberProjects from './SubscriberProjects';
import workflows from './workflowSaga';
import ProjectSaga from './ProjectSaga';
import alerts from './alertSupportSaga';




export default function* rootSaga() {
    yield all([
      clientList(),
      loginSaga(),
      registrationSaga(),
      userSaga(),
      teamSaga(),
      SubscriberProjects(),
      workflows(),
      ProjectSaga(),
      alerts()

    ]);
  }