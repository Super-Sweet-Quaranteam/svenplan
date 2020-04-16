import React, { Component } from 'react';
// import logo from '../../Logo/svenplan-logo2.png'

class ExistingWorkflows extends Component {

    state = {
        workflows: [
            {
                workflowId: 0,
                workflowName: "Small Business Guide",

            },
            {
                workflowId: 1,
                workflowName: 'Interior Design Guide'
            },
           
        ]
    }

    editWorkflow = () => {
        console.log('take to workflow')
        this.props.history.push({ pathname: '/createWorkflow' })
    }
    render() {
        return (
            <div >
                <p>Existing Workflows </p>

                <h2>Your Current Workflows:</h2>
                <ul>
                    {this.state.workflows.map(flow => (
                        <li  key={flow.workflowId}>
                            {flow.workflowName}
                            <button onClick={this.editWorkflow}>Edit</button>
                        </li>))}
                </ul>

            </div>
        );
    }
}

export default ExistingWorkflows;