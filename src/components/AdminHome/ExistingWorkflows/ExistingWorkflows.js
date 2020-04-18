import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditWorkflow from './EditWorkflow';
import Swal from 'sweetalert2';

class ExistingWorkflows extends Component {

    state = {
        edit: false,
        wf: {
            id: null,
            name: null,
            description: null
        }
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_ALL_WORKFLOWS'})
    }

    deleteWorkflow=(id)=> {
        Swal.fire({
            title: `Are you sure you want to delete this workflow?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                `Workflow has been deleted`,
                'success'
                );
                this.props.dispatch({type: 'DELETE_THIS_WORKFLOW', payload: {id: id}})
            }
        })
    }

    publishWorkflow=(id)=> {
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

    viewWorkflow=(id, name, description)=> {
        this.setState({edit: true, wf:{id: id, name: name, description: description}});
        this.props.dispatch({type: 'GET_THIS_WORKFLOW', payload: {id: id}})
    }

    render() {
        return (
            <>
                {this.state.edit
                ?
                <EditWorkflow wf={this.state.wf} wfID={this.state.wf.id}/>   
                :
                <>
                <h2>Existing Workflows:</h2>
                <ul>
    {/* suggest having two buttons, one that shows only if unpublished with an option to publish workflow */}
    {/* or better yet have this be displayed in two tables, on published and one not published with an option to publish */}
                    {this.props.reduxState.workflow.allWorkflows &&
                        this.props.reduxState.workflow.allWorkflows.map(flow => (
                            <li data-id={flow.id} key={flow.id}>
                                {flow.name}
                                <button className="btn-sml" onClick={()=>this.viewWorkflow(flow.id, flow.name, flow.description)}>View</button>
                                <button className="btn-sml" onClick={()=>this.deleteWorkflow(flow.id)}>Delete</button>
                                {flow.published === false &&
                                    <button className="btn-sml" onClick={()=>this.publishWorkflow(flow.id)}>Publish</button>
                                }
                            </li>
                        ))
                    }    
                </ul>
                </>
                }
            </>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(ExistingWorkflows);