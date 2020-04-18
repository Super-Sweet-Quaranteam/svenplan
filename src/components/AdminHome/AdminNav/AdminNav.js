import React from 'react';
import {connect} from 'react-redux';
import {HashRouter as Switch, Route, Link, Redirect, useRouteMatch} from 'react-router-dom';

import CreateWorkflow from '../ExistingWorkflows/CreateWorkflow';
import ExistingWorkflows from '../ExistingWorkflows/ExistingWorkflows'
import ExistingProjects from '../ExistingProjects/ExistingProjects'
import ClientAlerts from '../ClientAlerts/ClientAlerts';
import ClientList from '../ClientList/ClientList';
import UserProfile from '../../UserProfile/UserProfile';
import AdminHome from '../AdminHome';

//I'm using nested routing to do this! it does relative links based on current path.
function AdminNav(props) {
    let { path, url } = useRouteMatch();
    return (
        <>
            <nav className="nav-wrapper">
                <ul className="nav">
                    <li className="nav-item"><Link to={`${url}/home`} className="nav-link"><img src="/images/square-logo.png" alt="logo" height="80px" /></Link></li>
                    <li className="nav-item"><Link to={`${url}/create-workflow`} className="nav-link">Create Workflow</Link></li>
                    <li className="nav-item"><Link to={`${url}/workflows`} className="nav-link">Existing Workflows</Link></li>
                    {/* <li className="nav-item"><Link to={`${url}/alerts`} className="nav-link">Alerts</Link></li> */}
                    <li className="nav-item"><Link to={`${url}/subscribers`} className="nav-link">Subscribers</Link></li>
                    <li className="nav-item"><Link to={`${url}/profile`} className="nav-link">My Profile</Link></li>
                </ul>
            </nav>
        
            <Switch>
                <Redirect exact from="/" to={`${path}/home`}/>
                <Route path={`${path}/home`} component={AdminHome} />
                <Route path={`${path}/create-workflow`} component={CreateWorkflow}/>
                <Route path={`${path}/workflows`} component={ExistingWorkflows} />
                <Route path={`${path}/existing-projects`} component={ExistingProjects} />
                <Route path={`${path}/alerts`} component={ClientAlerts} />
                <Route path={`${path}/subscribers`} component={ClientList} />
                <Route path={`${path}/profile`} component={UserProfile} />
            </Switch>
        </>
    );  
}
  
export default connect()(AdminNav);