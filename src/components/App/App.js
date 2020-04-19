import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

//THESE ARE DEFINITELY BEING USED
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';

import UserProfile from '../UserProfile/UserProfile';

import CreateWorkflow from '../WorkflowEditor/CreateWorkflow';
import ExistingWorkflows from '../WorkflowEditor/ExistingWorkflows';
import Subscribers from '../Subscribers/Subscribers';
import AdminHome from '../AdminHome/AdminHome';
import SubscriberHome from '../SubscriberHome/SubscriberHome';
import ExistingProjects from '../ProjectManager/ExistingProjects'

// THESE SEEM UNUSED
// import AddTask from '../AddTask/AddTask';
// import Container from '../AddTask/Container';
// import Header from '../Header/Header';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
// import Alerts from '../AdminHome/Alerts/Alerts';
// {/* <Route path="/admin" component={AdminNav} /> */ }

class App extends Component {
  //sets the user, if there is one, in redux (even tho this component isn't connected to store)
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER' });
  }

  render() {
    return (
      <>
        <Router>
          {/* Navbar will show on every page, show different things based on user level/if user at all */}
          <Navbar />
          <Switch>
            {/* component view if not logged in */}
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/logIn" component ={LoginPage} />
            {/* these routes should be available when logged in as subscriber or admin */}
            <Route exact path="/profile" component={UserProfile}/>

            {/* this is for subscribers (maybe also admins?) */}
            <Route exact path="/dashboard" component={SubscriberHome}/>
            <Route exact path="/projects" component={ExistingProjects}/>

            {/* these routes should be available to admins only */}
            <Route exact path="/admin" component={AdminHome}/>
              {/* maybe '/dashboard' as a protected route that would display AdminHome or ClientHome would be more intuitive */}
            <Route exact path="/workflows/new" component={CreateWorkflow}/>
            <Route exact path="/workflows" component={ExistingWorkflows}/>
            <Route exact path="/subscribers" component={Subscribers}/>
                                
            {/* 404 page creation below */}
            <Route render={() => 
              <div className="fourOfour">
                <h1>There doesn't seem to be anything here.</h1>
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
