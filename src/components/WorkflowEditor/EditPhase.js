import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditTask from './EditTask';

class EditPhase extends Component {

    state={
        edit: false,
        task:{
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            time: new Date()
        }
        
    }

    // allows admin to add input types to a task
    editOptions=()=>{
        this.setState({edit: !this.state.edit});
    }

    // connect task options to  a task --- to be detriemend how this is set, currently does nothing
    saveOptions=()=>{
        this.setState({edit: !this.state.edit});
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

    render() {
        // holds the current workflow id between components where needed
        const wfID = this.props.wfID;

        return (
            <>
            {this.props.edit === false
            ?
            <>
            <div></div>
            </>
            :
            <>
                <form className="form" data-id={this.props.id} onSubmit={(e)=>this.handleSubmit(e, this.props.id)}>
                    <li>
                    <label htmlFor="task-name">Task Title: </label>
                        <input type="text" data-id={this.props.id} value={this.state.task.name || ""} placeholder="enter title for task" onChange={(e)=>this.handleChange(e, 'name')} />
                        <span>Enter task name here</span>
                    </li>
                    <li>
                    <label htmlFor="task-desctioption">Description: </label>
                        <input type="text" size="50" data-id={this.props.id} value={this.state.task.description || ""} placeholder="enter description for task" onChange={(e)=>this.handleChange(e, 'description')} />
                        <span>Describe the task here</span>
                    </li>
                    <input type="submit" value="save" className="btn-sml"/>
                    <button onClick={this.editOptions} className="btn-sml">Edit Task Options</button>
                </form>
                <br/>
                <br/> 
                <br/>                
                <hr width="250em"/>

                {this.state.edit === true &&
                <>
                    <button onClick={this.saveOptions} className="btn-sml">Save Task Options</button>
                    <EditTask
                        wfID={wfID}
                        taskID={this.props.id}
                        phaseID={this.props.phaseId}
                     />
                </>
                }
                <hr width="250em"/>
            </>
            }
            </>
        );
    }
}

const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditPhase);