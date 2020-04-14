import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import AdminHome from '../AdminHome/AdminHome';
import ClientHome from '../ClientHome/ClientHome';
import LandingPage from '../LandingPage/LandingPage';
import Footer from '../Footer/Footer';
import ClientList from '../AdminHome/ClientList/ClientList';
import ExistingProjects from '../AdminHome/ExistingProjects/ExistingProjects';
import ClientAlerts from '../AdminHome/ClientAlerts/ClientAlerts';

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* component view if not logged in */}
          <Route exact path="/" component={LandingPage} />
          {/* be sure to protect this route */}
          <Route exact path="/adminHome" component={AdminHome} />
          <Route exact path="/clientHome" component={ClientHome} />
          <Route exact path="/clientList" component={ClientList} />
          <Route exact path="/existingProjects" component={ExistingProjects} />
          <Route exact path="/clientAlerts" component={ClientAlerts} />
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;
