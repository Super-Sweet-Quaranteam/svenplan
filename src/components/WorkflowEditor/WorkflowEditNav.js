import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';


class WorkflowNav extends Component {

    // gets current phase by id to be displayed outside of side nav
    viewPhase=(id)=>{
        console.log(id)
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id:id}});
    }

    // one of two places workflows can be published, has alert before publishing
    publishWorkflow=()=>{
        let id = this.props.reduxState.workflow.thisWorkflow[0].wf_id;
        Swal.fire({
            title: `Would you like to make this workflow available to subsribers?`,
            text: "Publishing a workflow allows an admin to give a subscriber access to it",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Published!',
                `Workflow will now be available`,
                'success'
                );
                this.props.dispatch({type: 'PUBLISH_THIS_WORKFLOW', payload: {id: id}})
            }
        })
    }

    render() {
        return (
            <nav className="sidebar-nav">
                <ul className="side-nav">
                    <li className="workflow-name">{this.props.name}
                        <button className="btn-sml" onClick={this.props.editWorkflow}>Edit Title</button>
                        <button className="btn-sml" onClick={this.props.add}>Add Phase</button>
                    </li>
                    {this.props.reduxState.workflow.thisWorkflow &&
                        this.props.reduxState.workflow.thisWorkflow.map(phase=>
                            <li key={phase.ph_sequence} data-id={phase.ph_id} className="side-item" onClick={()=>this.viewPhase(phase.ph_id)}>
                                {phase.ph_name}
                            </li>
                        )
                    }
                    <li>
                        {/* maybe conditionally render this button and toggle between publish and unpublish */}
                        <span className="span"><button className="button" onClick={()=>this.publishWorkflow()}>Publish Workflow</button></span>
                    </li>

                    <li className="side-item final">
                        <span>need help?</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(WorkflowNav);