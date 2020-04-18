import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import CreateWorkflow from '../AdminHome/ExistingWorkflows/CreateWorkflow';
import ExistingWorkflows from '../AdminHome/ExistingWorkflows/ExistingWorkflows'
import ExistingProjects from '../AdminHome/ExistingProjects/ExistingProjects'
import ClientAlerts from '../AdminHome/ClientAlerts/ClientAlerts';
import ClientList from '../AdminHome/ClientList/ClientList';
import UserProfile from '../UserProfile/UserProfile';
import AdminHome from '../AdminHome/AdminHome';

function Navbar(props) {
    // let { path, url } = useRouteMatch();
    return (
        <nav className="nav-wrapper">
            {props.user.currentUser.level===1 &&
                <ul className="nav">
                    <li className="nav-item"><Link to='/admin' className="nav-link"><img src="/images/square-logo.png" alt="logo" height="80px" /></Link></li>
                    <li className="nav-item"><Link to='workflows/new' className="nav-link">Create Workflow</Link></li>
                    <li className="nav-item"><Link to='/workflows' className="nav-link">Existing Workflows</Link></li>
                    <li className="nav-item"><Link to='/subscribers' className="nav-link">Subscribers</Link></li>
                    <li className="nav-item"><Link to='/profile' className="nav-link">My Profile</Link></li>
                    <li className="nav-item">
                        <button onClick={() => props.dispatch({ type: 'LOGOUT' })}>Log Out</button>
                    </li>
                </ul>
            }
            {props.user.currentUser.level > 1 &&
                <ul className="nav">
                    <li className="nav-item"><Link to='/dashboard' className="nav-link"><img src="/images/square-logo.png" alt="logo" height="80px" /></Link></li>
                    <li className="nav-item"><Link to='/profile' className="nav-link">My Profile</Link></li>
                    <li className="nav-item"><Link to='/projects/new' className="nav-link">New Project</Link></li>
                    <li className="nav-item"><Link to='/projects' className="nav-link">Projects</Link></li>
                    <li className="nav-item"><Link to='/support' className="nav-link">Support</Link></li>
                    <li className="nav-item">
                        <button onClick={() => props.dispatch({ type: 'LOGOUT' })}>Log Out</button>
                    </li>
                </ul>
            }
            {!props.user.currentUser.level &&
                <ul className="nav">
                    <li className="nav-item"><Link to='/' className="nav-link"><img src="/images/square-logo.png" alt="logo" height="80px" /></Link></li>
                    <li className="nav-item">
                        <Link to='/logIn' className="nav-link">Log In</Link>
                    </li>
                </ul>
            }
        </nav>
    );  
}
  

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(Navbar);