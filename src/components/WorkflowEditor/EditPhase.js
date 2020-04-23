import React, { Component } from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import AddTask from './AddTaskHaley/AddTaskHaley';

class EditPhase extends Component {

    state={
        id: '',
        name: '',
        description: '',
        time: new Date()
    }

    //allows for adding a new Task - handled in EditTask.js
    addTask=()=>{
        if(this.props.reduxState.workflow.storeCurent.editTask === true){
            this.props.dispatch({type: 'TOGGLE_EDIT_TASK'});
        }
        this.props.dispatch({type: 'TOGGLE_ADD_TASK'});
    }

    // deletes selected phase, has warning before removal
    deletePhase=(name)=>{
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
                    id: this.props.reduxState.workflow.storeCurent.workflow.id, 
                    phase: this.props.reduxState.workflow.storeCurent.phase
                }});
                // this.props.dispatch({type: 'TOGGLE_EDIT_PHASE'});
                this.props.dispatch({type: 'TOGGLE_SHOW_PHASE'});
            }
        })
    }

    // allows for editing a phase - conditionally rendered below
    editPhase=()=>{
        this.props.dispatch({type: 'TOGGLE_EDIT_PHASE'});
    }

    // handles state changes for forms
    handleChange=(e, propertyName)=>{
        this.setState({
            ...this.state,
            [propertyName]: e.target.value
        })
    }

    // saves a new phase to db
    saveNewPhase=(e)=>{
        e.preventDefault();
        const nextSequence = (Math.max(...this.props.reduxState.workflow.thisWorkflow.map(phase=>phase.ph_sequence),0)+1);
        this.props.dispatch({type: 'ADD_NEW_PHASE', payload: {
            id: this.props.reduxState.workflow.storeCurent.workflow.id, 
            phase: {name: this.state.name, description: this.state.description, time: this.state.time},
            sequence: nextSequence
        }});
        this.setState({
            id: '',
            name: '',
            description: '',
            time: new Date()
        });
    }

    // saves an edited Phase to db
    savePhaseEdit=(e, phaseID)=>{
        e.preventDefault();
        this.setState({id: phaseID})
        if(this.state.name === ''){
            this.setState({name: this.props.reduxState.workflow.storeCurent.phase.name})}
        if(this.state.description === ''){
           this.setState({description: this.props.reduxState.workflow.storeCurent.phase.description})}
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
                this.props.dispatch({type: 'EDIT_PHASE_NAME', payload: {
                    id: this.props.reduxState.workflow.storeCurent.workflow.id, 
                    phase: this.state
                }});
                this.props.dispatch({type: 'TOGGLE_EDIT_PHASE'});
            }
        })
    }

    // gets current Task by id to be displayed below - handled in EditTask.js
    viewTask=(id)=>{
        this.props.dispatch({type: 'GET_THIS_TASK', payload:{id:id}});
        this.props.dispatch({type: 'TOGGLE_EDIT_TASK'});
    }


    render() {
        return (
            <>  
            {/* show add phase form upon trigger */}
                {this.props.reduxState.workflow.storeCurent.addPhase === true
                ?
                    <div className="add-phase">
                        <form className="form" data-id="" onSubmit={(e)=>this.saveNewPhase(e)}>
                            <li>
                            <label htmlFor="phase-name">Phase Title: </label>
                                <input type="text" data-id="" value={this.state.name} 
                                    placeholder="enter title for phase" onChange={(e)=>this.handleChange(e, 'name')} />
                                <span>Enter Phase Name Here</span>
                            </li>
                            <li>
                            <label htmlFor="phase-desctioption">Phase Description: </label>
                                <input type="text" size="50" data-id="" value={this.state.description} 
                                    placeholder="enter description of phase" onChange={(e)=>this.handleChange(e, 'description')} />
                                <span>Describe the Phase here</span>
                            </li>
                            <input type="submit" value="save" className="btn-sml"/>
                        </form>
                        <br/> 
                    </div>
                :
                    <>
                    {/* else show all tasks in curently highlighted phase */}
                        {this.props.reduxState.workflow.storeCurent.phase &&
                        <>
                            <div className="side-button"><button className="btn-sml" onClick={this.editPhase}>Edit</button></div>
                            <h1 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.phase.name}</h1>
                            <h3 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.phase.description}</h3>
                            {this.props.reduxState.workflow.thisPhase &&
                                <>
                                    {this.props.reduxState.workflow.storeCurent.editPhase === false &&
                                        <nav className="workflowInfo">
                                            <li className="phase-block-btn" onClick={this.addTask}>
                                                Add New Task
                                            </li>
                                                {this.props.reduxState.workflow.thisPhase.map(task=>
                                                    <li key={task.task_id} data-id={task.task_id} className="phase-block" 
                                                        onClick={()=>this.viewTask(task.task_id)}>
                                                        <div className="phase-text">{task.task_name}</div>
                                                        <br/>
                                                        <div className="phase-text">{task.task_description}</div>
                                                    </li>
                                                )}
                                        </nav>
                                    }
                                </>
                            }
                        </>
                        }
                    </>
                }
                <>
                    {this.props.reduxState.workflow.storeCurent.editPhase === true && 
                    <>
                    {/* show phase edit form if triggered */}
                        {this.props.reduxState.workflow.storeCurent.phase &&
                            <div className="add-phase">
                            <form className="form" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                                onSubmit={(e)=>this.savePhaseEdit(e, this.props.reduxState.workflow.storeCurent.phase.id)}>
                                <li>
                                <label htmlFor="phase-name">Phase Title: </label>
                                    <input type="text" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                                        defaultValue={this.props.reduxState.workflow.storeCurent.phase.name} placeholder="enter title for phase" 
                                        onChange={(e)=>this.handleChange(e, 'name')} />
                                    <span>Enter Phase Name Here</span>
                                </li>
                                <li>
                                <label htmlFor="phase-desctioption">Phase Description: </label>
                                    <input type="text" size="50" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                                        defaultValue={this.props.reduxState.workflow.storeCurent.phase.description} placeholder="enter description for phase" 
                                        onChange={(e)=>this.handleChange(e, 'description')} />
                                    <span>Describe the Phase here</span>
                                </li>
                                <input type="submit" value="save" className="btn-sml"/>
                                <button type="button" className="btn-sml-delete" onClick={()=>this.deletePhase(this.props.reduxState.workflow.storeCurent.phase.name)}>Delete Phase</button>
                            </form>
                            <br/> 
                        </div>
                        }
                    </>
                    }
                    {/* renders the edit or add task section */}
                        {(this.props.reduxState.workflow.storeCurent.addTask === true 
                        || 
                        this.props.reduxState.workflow.storeCurent.editTask === true) &&
                        <AddTask />
                        }                    
                </>
            </>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditPhase);