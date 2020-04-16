import React from 'react';

import NewWorkflow from '../../NewWorkflow/NewWorkflow';
import MiniTask from '../../MiniTask/MiniTask'


function CreateWorkflow(props) {


    return (
        <div >
            <p>New Workflow</p>

            <h2>Create a new workflow</h2>
         
            <NewWorkflow />
            <MiniTask />

        </div>
    );
}

export default CreateWorkflow;
