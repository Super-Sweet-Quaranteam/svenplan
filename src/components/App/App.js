import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

// routes for all users regardless of access level
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoginPage from '../LoginPage/LoginPage';
import UserProfile from '../UserProfile/UserProfile';

// currently unused
import LandingPage from '../LandingPage/LandingPage';

// routes for level 3 access level, subscribers
import SubscriberHome from '../SubscriberHome/SubscriberHome';
import ExistingProjects from '../ProjectManager/ExistingProjects';
import SupportPage from '../SupportPage/SupportPage';
import NewProject from '../ProjectManager/NewProject';
import ProjectDetails from '../ProjectManager/ProjectDetails';
import ProjectData from '../ProjectManager/ProjectData';

// routes for level 1 or 2 admin access level
import Alerts from '../Alerts/Alerts';
import CreateWorkflow from '../WorkflowEditor/CreateWorkflow';
import ExistingWorkflows from '../WorkflowEditor/ExistingWorkflows';
import Subscribers from '../Subscribers/Subscribers';
import AdminHome from '../AdminHome/AdminHome';
import EditWorkflow from '../WorkflowEditor/EditWorkflow';
import TeamMembers from '../TeamMembers/TeamMembers'
import Teams from '../Teams/Teams';

// added security to be set up
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



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
            

            {/* this is for subscribers only level 3 access */}
            <Route exact path="/dashboard" component={SubscriberHome}/>
            <Route exact path="/projects" component={ExistingProjects}/>
            <Route exact path="/projects/new" component={NewProject} />
            <Route exact path="/projects/:projectId" component={ProjectDetails}/>
            <Route exact path="/projects/data/:projectId" component={ProjectData}/>
            <Route exact path="/support" component={SupportPage}/>


            {/* these routes are available to admins only level 1 or 2 access */}
            <Route exact path="/admin" component={AdminHome}/>
            <Route exact path="/workflows/edit" component={EditWorkflow}/>
            <Route exact path="/workflows/new" component={CreateWorkflow}/>
            <Route exact path="/workflows" component={ExistingWorkflows}/>
            <Route exact path="/subscribers" component={Subscribers}/>
            <Route exact path="/teammembers" component={TeamMembers}/>
            <Route exact path="/teams" component={Teams}/>
            <Route exact path="/alerts" component={Alerts}/>

            {/* protected route currently no routes are being protected in this manner*/}
            <ProtectedRoute exact path="/home" component={AdminHome}/>

      
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
