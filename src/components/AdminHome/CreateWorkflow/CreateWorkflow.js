import React from 'react';
import logo from '../../Logo/svenplan-logo2.png';
import NewWorkflow from '../../NewWorkflow/NewWorkflow';


function CreateWorkflow(props) {


    return (
        <div >
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>New Workflow</p>

            <h2>Create a new workflow</h2>
         
            <NewWorkflow />

        </div>
    );
}

export default CreateWorkflow;