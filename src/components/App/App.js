import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from '../Navbar/Navbar';
import ClientHome from '../ClientHome/ClientHome';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
// import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// import AddTask from '../AddTask/AddTask';
// import Container from '../AddTask/Container';


// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

class App extends Component {
  //sets the user in redux (even tho this component isn't connected to store)
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER' });
  }

  render() {
    return (
      <>
    {/* <Header></Header> */}
        <Router>
          {/* Navbar will show on every page, show different things based on user level/if user at all */}
          <Navbar />
          <Switch>
            {/* component view if not logged in */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/logIn" component ={LoginPage} />
            {/* be sure to protect this route */}
            {/* <Route path="/admin" component={AdminNav} /> */}
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
}

export default connect()(App);
