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
    function existingWorkflows(event) {
        props.history.push({ pathname: '/existingWorkflows' })
    }


    return (
        <div >       
            <p>Admin Home </p>

            <h2>Welcome, 'username'</h2>
            <div className='display'>
                <div className="adminNav">
                    <h5 onClick={existingWorkflows} className="navText">Existing WorkFlows</h5> 
                    <h5 onClick={existingProjects} className="navText">Existing Projects</h5> 
                    <h5 onClick={clientAlerts} className="navText">Client Alerts</h5> 
                    <h5 onClick={clientList} className="navText">Client List</h5> 
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