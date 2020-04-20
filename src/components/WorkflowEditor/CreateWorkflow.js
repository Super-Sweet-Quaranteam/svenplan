import React, {Component} from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'


class CreateWorkflow extends Component {

    state = {
        workflow: {
            name: '',
            description: '',
            time: new Date()
        }
    }

    // creates a brand new workflow, moves user to see all workflows from there
    createWorkflow=()=>{ 
        this.props.dispatch({type: 'ADD_NEW_WORKFLOW', payload: {
            name: this.state.workflow.name, description: this.state.workflow.description, time: this.state.workflow.time
        }})
        Swal.fire({
            title: 'Created!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this.props.history.push('/workflows')
            }
          })
    }

    handleChange=(event, typeOf)=>{                
        this.setState({
            workflow:{
                ...this.state.workflow,
                [typeOf]: event.target.value
            }
        })
    }

    render() {
        return (
            <div className="workflowWrapper">
                <div className="workflowInfo">
                    <hr/>
                    <form className="form">
                        <li>
                            <label> Workflow Name:</label> 
                            <input defaultValue={this.state.workflow.name} placeholder="title new workflow" onChange={(event)=>this.handleChange(event, "name")}></input>
                            <span>Enter your workflow name here</span>
                        </li>
                        <li>
                            <label> Description:</label> 
                            <textarea rows="5" defaultValue={this.state.workflow.description} placeholder="describe new workflow" onChange={(event)=>this.handleChange(event, "description")}></textarea>
                            <span>Describe your workflow here</span>
                        </li>                     
                        <button className="button" onClick={this.createWorkflow}>Create</button>
                        <br/>
                        <br/>
                    </form>
                </div>  
            </div>
        );
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});


export default connect(mapStateToProps)(CreateWorkflow);
