import React from 'react';


function NewWorkflow(props) {

    function createWorkflow(event) {
        console.log('creating workflow')
    }
    return (
        <div>
            <h1>SvenPlan</h1>
            <h3>New Workflow Home </h3>
            
                <p> onClick={createWorkflow}>New WorkFlow</p>
                
        </div>
    );
}

export default NewWorkflow;
