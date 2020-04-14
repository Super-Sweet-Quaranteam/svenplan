import React from 'react';

import './AdminHome.css'
import logo from '../Logo/svenplan-logo2.png'





function AdminHome(props) {

    function createWorkflow(event) {
        props.history.push({ pathname: '/createWorkflow' })
    }
    function clientList(event) {
        props.history.push({ pathname: '/clientList' })
    }
    function clientAlerts(event) {
        props.history.push({ pathname: '/clientAlerts' })
    }
    function existingProjects(event) {
        props.history.push({ pathname: '/existingProjects' })
    }
    return (
        <div >       
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>Admin Home </p>

            <h2>Welcome, 'username'</h2>
            <div class='display'>
            <div class="adminNav">
                    <h5 class="navText">Existing WorkFlows</h5> <h5 onClick={existingProjects} class="navText">Existing Projects</h5> <h5 onClick={clientAlerts} class="navText">Client Alerts</h5> <h5 onClick={clientList} class="navText">Client List</h5> 
            </div>
            <ul>
                <li onClick={createWorkflow}>Create WorkFlow</li>
                <li>New Project</li>

                <li>Existing Projects</li>
            </ul>
            
        </div>

           
        </div>
    );
}

export default AdminHome;