import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'


class CreateWorkflow extends Component {

    state = {
        id: '',
        name: '',
        description: '',
        time: new Date()
    }

    // creates a brand new workflow, moves user to see all workflows from there
    createWorkflow=()=>{ 
        this.props.dispatch({type: 'ADD_NEW_WORKFLOW', payload: {
            name: this.state.name, description: this.state.description, time: this.state.time
        }})
        this.props.dispatch({type: 'GET_ALL_WORKFLOWS'})
        Swal.fire({
            title: 'Created!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
                let id = (Math.max(...this.props.reduxState.workflow.allWorkflows.map(wf=>wf.id),0));
                this.props.dispatch({type: 'GET_THIS_WORKFLOW', payload: {id: id}});
                this.props.history.push('/workflows/edit');
            }
        })
        this.setState({
            id: '',
            name: '',
            description: '',
            time: new Date()
        })
    }

    // user warning before deleting a workflow
    deleteWorkflow=()=> {
        let id = this.props.reduxState.workflow.storeCurent.workflow.id;
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
                this.props.dispatch({type: 'DELETE_THIS_WORKFLOW', payload: {id: id}});
                this.props.history.push('/workflows');
            }
        })
    }

    handleChange=(event, propertyName)=>{                
        this.setState({
            [propertyName]: event.target.value
        })
    }

    // one of two places workflows can be published, has alert before publishing
    publishWorkflow=()=>{
        let id = this.props.reduxState.workflow.storeCurent.workflow.id;
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

    saveWF=()=>{
        this.setState({id:this.props.reduxState.workflow.storeCurent.workflow.id});
        if(this.state.name === ''){
            this.setState({name: this.props.reduxState.workflow.storeCurent.workflow.name})}
        if(this.state.description === ''){
            this.setState({description: this.props.reduxState.workflow.storeCurent.workflow.description})}
        this.setState({edit:false});
        Swal.fire({
            title: `Keep the changes?`,
            text: `name: ${this.state.name}, description: ${this.state.description}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Success!',
                `${this.state.name} has been updated`,
                'success'
                );
                this.props.dispatch({type: 'EDIT_WORKFLOW_NAME', payload: this.state})
            }
        })
        this.setState({
            id: '',
            name: '',
            description: '',
            time: new Date()
        })

    }

    render() {
        return (
            <>
                {this.props.reduxState.workflow.storeCurent.editWorkflow === true
                ?
                <div className="workflowInfo">
                    <form className="form">
                        <li>
                            <label> Workflow Name:</label> 
                            <input defaultValue={this.props.reduxState.workflow.storeCurent.workflow.name} 
                                placeholder="title new workflow" onChange={(event)=>this.handleChange(event, "name")}></input>
                            <span>Enter your workflow name here</span>
                        </li>
                        <li>
                            <label> Description:</label> 
                            <textarea rows="5" defaultValue={this.props.reduxState.workflow.storeCurent.workflow.description} 
                                placeholder="describe new workflow" onChange={(event)=>this.handleChange(event, "description")}></textarea>
                            <span>Describe your workflow here</span>
                        </li>         
                        <button className="button" onClick={this.saveWF}>Save</button>        
                        <button className="button" onClick={this.publishWorkflow}>Publish Workflow</button>
                        <button className="button-delete" onClick={this.deleteWorkflow}>Delete</button>
                        <br/>
                        <br/>
                    </form>
                </div>  
                :
                <div className="workflowInfo">
                    <form className="form">
                        <li>
                            <label> Workflow Name:</label> 
                            <input defaultValue={this.state.name} placeholder="title new workflow" onChange={(event)=>this.handleChange(event, "name")}></input>
                            <span>Enter your workflow name here</span>
                        </li>
                        <li>
                            <label> Description:</label> 
                            <textarea rows="5" defaultValue={this.state.description} placeholder="describe new workflow" onChange={(event)=>this.handleChange(event, "description")}></textarea>
                            <span>Describe your workflow here</span>
                        </li>                 
                        <button className="button" onClick={this.createWorkflow}>Create</button>
                        <br/>
                        <br/>
                    </form>
                </div>  
                }  
            </>
        );
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});


export default connect(mapStateToProps)(withRouter(CreateWorkflow));
