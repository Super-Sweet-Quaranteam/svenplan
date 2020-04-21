import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditTask from './EditTask';
import Swal from 'sweetalert2';

class EditPhase extends Component {

    state={
        taskEdit: false,
        task:{
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            time: new Date()
        }
        
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

    // allows admin to add input types to a task
    editOptions=()=>{
        this.setState({taskEdit: true});
        console.log('pop!', this.state)
    }

    // connect task options to  a task --- to be detriemend how this is set, currently does nothing
    saveOptions=()=>{
        this.setState({edit: false});
        this.props.dispatch({type: 'SET_TASK_OPTIONS', payload: ''})
    }

    handleChange=(e, propertyName)=>{
        this.setState({
            task:{
                ...this.state.task,
                [propertyName]: e.target.value
            }
        })
    }

    // checks if new or existing task, sends relevant dispatach to saga
    handleSubmit=(e, id)=>{
        e.preventDefault();
        this.setState({edit:false});
        const nextSequence = (Math.max(...this.props.reduxState.workflow.thisPhase.map(task=>task.task_sequence),0)+1);	
        if(id === null){
            this.props.dispatch({type: 'ADD_NEW_TASK', payload: {id: this.props.phaseId, task:this.state.task, seq: nextSequence}})
        }else{
            this.props.dispatch({type: 'EDIT_TASK_NAME', payload: {id: this.props.phaseId, task:this.state.task}})
        }
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

    render() {
        return (
            <>
                {this.state.addPhase === true 
                ?
                    <div className="add-phase">
                        <form className="form" data-id={this.props.id} onSubmit={(e)=>this.handleSubmit(e, this.props.id)}>
                            <li>
                            <label htmlFor="task-name">Phase Title: </label>
                                <input type="text" data-id={this.props.id} value={this.state.task.name || ""} placeholder="enter title for task" onChange={(e)=>this.handleChange(e, 'name')} />
                                <span>Enter Phase Name Here</span>
                            </li>
                            <li>
                            <label htmlFor="task-desctioption">Phase Description: </label>
                                <input type="text" size="50" data-id={this.props.id} value={this.state.task.description || ""} placeholder="enter description for task" onChange={(e)=>this.handleChange(e, 'description')} />
                                <span>Describe the Phase here</span>
                            </li>
                            <input type="submit" value="save" className="btn-sml"/>
                            <button onClick={this.editOptions} className="btn-sml">Edit Task Options</button>
                        </form>
                        <br/> 
                    </div>
                :
                    <>
                        {this.props.reduxState.workflow.storeCurent.phase &&
                        <>
                            <h1 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.phase.name}</h1>
                            <h3 className="workflowDescription">{this.props.reduxState.workflow.storeCurent.phase.description}</h3>
                            {this.props.reduxState.workflow.thisPhase &&
                                <nav className="workflowInfo">
                                    <li className="phase-block-btn" onClick={this.addTask}>
                                        Add New Task
                                    </li>
                                        {this.props.reduxState.workflow.thisPhase.map(task=>
                                            <li key={task.task_sequence} data-id={task.task_id} className="phase-block" onClick={()=>this.viewTask(task.task_id)}>
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
                <>
                    {this.state.editPhase === true && 
                    <>
                        {this.props.reduxState.workflow.storeCurent.phase &&
                            <div className="add-phase">
                            <form className="form" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                            onSubmit={(e)=>this.handleSubmit(e, this.props.reduxState.workflow.storeCurent.phase.id)}>
                                <li>
                                <label htmlFor="task-name">Phase Title: </label>
                                    <input type="text" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                                        value={this.props.reduxState.workflow.storeCurent.phase.name} placeholder="enter title for task" 
                                        onChange={(e)=>this.handleChange(e, 'name')} />
                                    <span>Enter Phase Name Here</span>
                                </li>
                                <li>
                                <label htmlFor="task-desctioption">Phase Description: </label>
                                    <input type="text" size="50" data-id={this.props.reduxState.workflow.storeCurent.phase.id} 
                                        value={this.props.reduxState.workflow.storeCurent.phase.description} placeholder="enter description for task" 
                                        onChange={(e)=>this.handleChange(e, 'description')} />
                                    <span>Describe the Phase here</span>
                                </li>
                                <input type="submit" value="save" className="btn-sml"/>
                                <button onClick={this.editOptions} className="btn-sml">Edit Task Options</button>
                            </form>
                            <br/> 
                        </div>
                        }
                    </>
                    }
                    {this.state.taskEdit === true &&
                    <>
                        <button onClick={this.saveOptions} className="btn-sml">Save Task Options</button>
                        <EditTask
                            taskID={this.props.id}
                            phaseID={this.props.phaseId}
                        />
                        <hr width="250em"/>
                    </>
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