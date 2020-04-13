import React from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';

import AdminHome from '../AdminHome/AdminHome';
import ClientHome from '../ClientHome/ClientHome';
import LandingPage from '../LandingPage/LandingPage';
import Footer from '../Footer/Footer'
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={LandingPage} />
        {/* be sure to protect this route */}
        <Route exact path="/adminHome" component={AdminHome} />
        <Route exact path="/clientHome" component={ClientHome} />
      </Router>
      <Footer />
    </div>
  )
}

export default App;
