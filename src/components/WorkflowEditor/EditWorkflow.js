import React, {Component} from 'react';
import {connect} from 'react-redux';
import WorkflowEditNav from './WorkflowEditNav';
import EditPhase from './EditPhase';
import Swal from 'sweetalert2';


class EditWorkflow extends Component {

    state = {
        edit: false,
        editPhase: false,
        addPhase: false,
        workflow: {
            id: this.props.wf.id,
            name: this.props.wf.name,
            description: this.props.wf.description,
            time: new Date()
        },
        phase:{
            id: null,
            name: null,
            description: null,
            time: new Date()
        },
        newPhase:{
            name: null,
            description: null,
            time: new Date()
        }
    }

    addPhase=()=>{
        this.setState({edit: true, addPhase: true})
    }

    changePhase=(e, propertyName)=>{
        this.setState({
            phase:{
                ...this.state.phase,
                [propertyName]: e.target.value
            }
        })
    }

    // deletes selected phase, has warning before removal
    deletePhase=(name)=>{
        this.setState({editPhase: !this.state.editPhase});
        Swal.fire({
            title: `Are you sure you want to delete ${name}?`,
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
                `${name} has been removed from this workflow`,
                'success'
                );
                this.props.dispatch({type: 'REMOVE_PHASE', payload: {
                    id: this.state.workflow.id, 
                    phase: this.state.phase
                }});
            }
        })

    }

    editWorkflow=()=>{
        this.setState({edit: true})
    }

    editPhase=()=>{
        this.setState({
            editPhase: !this.state.editPhase,
            phase:{
                ...this.state.phase,
                name: this.props.reduxState.workflow.thisPhase[0].ph_name,
                description: this.props.reduxState.workflow.thisPhase[0].ph_description,
                id: this.props.reduxState.workflow.thisPhase[0].ph_id
            }
        })
    }

    handleChange=(e, propertyName)=>{   
        this.setState({
            workflow:{
                ...this.state.workflow,
                [propertyName]: e.target.value
            }
        })
    }

    handleNewPhase=(event, propertyName)=>{
        this.setState({
            newPhase:{
                ...this.state.newPhase,
                [propertyName]: event.target.value
            }
        })
    }

    saveNewPhase=()=>{
        this.setState({edit: false, addPhase: false});
        const nextSequence = (Math.max(...this.props.reduxState.workflow.thisWorkflow.map(phase=>phase.ph_sequence),0)+1);
        this.props.dispatch({type: 'ADD_NEW_PHASE', payload: {
            id: this.state.workflow.id, 
            phase: this.state.newPhase,
            sequence: nextSequence
        }})
    }

    savePhase=()=>{
        this.setState({editPhase: !this.state.editPhase})
        this.props.dispatch({type: 'EDIT_PHASE_NAME', payload: {
            id: this.state.workflow.id, 
            phase: this.state.phase
        }})
    }

    saveWF=()=>{
        this.setState({edit:false})
        this.props.dispatch({type: 'EDIT_WORKFLOW_NAME', payload: this.state.workflow})
    }


    render() {
        return (
            <div className="workflowWrapper">
                <div className="workflowInfo">
                    {this.state.edit === true
                    ?
                    <>
                        {this.state.addPhase === false 
                        ?
                        <>
                            <hr/>
                            <label> Workflow Name:
                                <br/>
                                <input defaultValue={this.state.workflow.name} onChange={(event)=>this.handleChange(event, "name")}></input>
                            </label> 
                            <br/>
                            <label> Description:
                                <br/>
                                <textarea rows="5" defaultValue={this.state.workflow.description} onChange={(event)=>this.handleChange(event, "description")}></textarea>
                            </label>  
                            <br/>                   
                            <button className="button" onClick={this.saveWF}>Save</button>
                            <br/>
                        </>
                        :
                        <>
                            <hr/>
                            <label> Phase Name:
                                <br/>
                                <input placeholder="Title New Phase" onChange={(event)=>this.handleNewPhase(event, "name")}></input>
                            </label> 
                            <br/>
                            <label> Description:
                                <br/>
                                <input size="50" placeholder="description of new phase" onChange={(event)=>this.handleNewPhase(event, "description")}></input>
                            </label>  
                            <br/>                   
                            <button className="button" onClick={this.saveNewPhase}>Save</button>
                        </>
                        }
                    </>
                    :
                    <>
                        <WorkflowEditNav  name={this.state.workflow.name} editWorkflow={this.editWorkflow} add={this.addPhase}/>
                            <h3 className="workflowDescription">{this.state.workflow.description}
                                <br/> 
                                              
                            </h3>
                            <br/>
                        {this.props.reduxState.workflow.thisPhase &&
                        <>
                        {this.props.reduxState.workflow.thisPhase[0] &&
                            <>
                                
                                {this.state.editPhase === false
                                ?
                                <>
                                <h1>{this.props.reduxState.workflow.thisPhase[0].ph_name}</h1>
                                <button className="button" onClick={this.editPhase}>Edit Phase</button>
                                </> 
                                :
                                <>
                                <form>
                                    <label>Phase Name:
                                        <input type="text" defaultValue={this.state.phase.name} onChange={(e)=>this.changePhase(e, 'name')} />
                                    </label>
                                    <br/>
                                    <label>Description:
                                        <input type="text" size="50" defaultValue={this.state.phase.description} onChange={(e)=>this.changePhase(e, 'description')} />
                                    </label>
                                    <br/>
                                    <button className="button" onClick={this.savePhase}>Save Phase</button>
                                    <button className="button" onClick={()=>this.deletePhase(this.state.phase.name)}>Delete Phase</button>
                                </form>    
                                    <hr/>
                                </>
                                }
                                
                            </>
                        }
                            <div className="phaseWrapper">
                                {this.props.reduxState.workflow.thisPhase.map((task, i )=> 
                                <EditPhase 
                                    key={i}
                                    id={task.task_id}
                                    phaseId={task.ph_id}
                                    phase={task.ph_name}
                                    name={task.task_name}
                                    description={task.task_description}
                                    nextSequence={task.task_sequence}
                                    edit={this.state.editPhase}
                                    wfID={this.props.wfID}
                                />
                                )}
                            </div>
                        </>
                        }
                    </>
                    }
                </div>                        
            </div>
        );
    }
}


const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(EditWorkflow);