import React from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from 'react-router-dom';

import ClientList from '../ClientList/ClientList';
import Profile from '../../UserProfile/UserProfile';
import UserProfile from '../../UserProfile/UserProfile';

function AdminNav(props) {
    let { path, url } = useRouteMatch();
    return (
        <>
            <nav className="nav-wrapper">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to={`${url}/subscribers`} className="nav-link">Subscribers</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${url}/profile`} className="nav-link">My Profile</Link>
                    </li>
                </ul>
            </nav>
        
            <Switch>
                <Route path={`${path}/subscribers`}>
                    <ClientList />
                </Route>
                <Route path={`${path}/profile`}>
                    <UserProfile />
                </Route>
            </Switch>






            {/* <nav className="nav-wrapper"> */}
                {/* <ul className="nav">
                    <li className="nav-logo"><img src="/images/square-logo.png" alt="logo" height="80px"></img></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'ADMIN_DISPLAY', payload: {displayOldWorkFlow: true}})}>
                        <a className="nav-link" href="#/adminHome">Existing Workflows</a></li>
                    <li className="nav-item" onClick={() => props.dispatch({ type: 'ADMIN_DISPLAY', payload: { displayNewWorkFlow: true } })}>
                        <a className="nav-link" href="#/adminHome">New Workflow</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'ADMIN_DISPLAY', payload: {displayNewWorkFlow: true}})}>
                        <a className="nav-link" href="#/adminHome">New Projects</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'ADMIN_DISPLAY', payload: {displayOldProjects: true}})}>
                        <a className="nav-link" href="#/adminHome">Existing Projects</a></li>
                    <li className="nav-item" onClick={()=>props.dispatch({type: 'ADMIN_DISPLAY', payload: {displayAlerts: true}})}>
                        <a className="nav-link" href="#/adminHome">Client Alerts</a></li>
                    <li className="nav-item" onClick={() => props.dispatch({ type: 'ADMIN_DISPLAY', payload: { displayClients: true } })}>
                        <a className="nav-link" href="#adminHome">Client List</a></li>
                    <li className="nav-item" onClick={() => props.dispatch({ type: 'ADMIN_DISPLAY', payload: { displayProfile: true } })}>
                        <a className="nav-link" href="#/adminHome">Profile</a></li>
                </ul> */}
            {/* </nav> */}
        </>
    );  
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AdminNav);