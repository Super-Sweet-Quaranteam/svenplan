import React from 'react';
import NewWorkflow from '../NewWorkflow/NewWorkflow';


function AdminHome(props) {

    function newWorkflow(event) {
        props.history.push({ pathname: '/createWorkflow' })
    }
    return (
        <div>
            <h1>SvenPlan</h1>
            <h3>Admin Home </h3>
            <ul>
                <li onClick={newWorkflow}>New WorkFlow</li>
                <li>Existing WorkFlows</li>
                <li>New Project</li>
                <li>Existing Projects</li>

                
            </ul>
        </div>
    );
}

export default AdminHome;
