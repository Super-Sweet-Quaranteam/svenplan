import React from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import AdminHome from '../AdminHome/AdminHome';
import ClientHome from '../ClientHome/ClientHome';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// import AddTask from '../AddTask/AddTask';
// import Container from '../AddTask/Container';


// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  return (
    <>
    {/* <Header></Header> */}
      <Router>
        <Switch>
          {/* component view if not logged in */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/logIn" component ={LoginPage} />
          {/* be sure to protect this route */}
          <Route exact path="/adminHome" component={AdminHome} />
          <Route exact path="/clientHome" component={ClientHome} />
          {/* 404 page creation below */}
          <Route render={() => 
            <div className="fourOfour">
              <a href="#add-task" ><img src="/images/NEOOPartnersLogo.png" alt="neoo"/></a>
            </div>
          } />
        </Switch>
      </Router>
      <Footer />
    </>
  )
}

export default App;
