import React, {Component} from 'react';
import {connect} from 'react-redux';


class EditTask extends Component {

    state={
        id: '',
        name: '',
        description: '',
        time: new Date(),
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_TASK_OPTIONS'})
    }

    // allows for editing a task - handled in EditTask.js
    editTask=()=>{
        this.props.dispatch({type: 'TOGGLE_EDIT_TASK'});
    }

    // allows admin to add input types to a task
    editOptions=()=>{
        this.setState({taskEdit: true});
        // console.log('pop!', this.state)
    }
    
    // handles state changes for forms
    handleChange=(e, propertyName)=>{
        this.setState({
            ...this.state,
            [propertyName]: e.target.value
        })
    }

    // connect task options to  a task --- to be detriemend how this is set, currently does nothing
    saveOptions=()=>{
        this.setState({edit: false});
        this.props.dispatch({type: 'SET_TASK_OPTIONS', payload: ''})
    }

    // checks if new or existing task, sends relevant dispatach to saga
    saveTask=(e, id)=>{
        e.preventDefault();
        const nextSequence = (Math.max(...this.props.reduxState.workflow.thisPhase.map(task=>task.task_sequence),0)+1);	
        if(id === ''){
            this.props.dispatch({type: 'ADD_NEW_TASK', payload: 
            {id: this.props.reduxState.workflow.storeCurent.phase.id, task:this.state, seq: nextSequence}})
            this.props.dispatch({type: 'TOGGLE_ADD_TASK'});
        }else{
            this.setState({id:id})
            this.props.dispatch({type: 'EDIT_TASK_NAME', payload: 
            {id: this.props.reduxState.workflow.storeCurent.phase.id, task:this.state}})
            this.props.dispatch({type: 'TOGGLE_EDIT_TASK'});
        }
        this.setState({
            id: '',
            name: '',
            description: '',
            time: new Date(),
        })
    }


    render() {
        
        // creates the dropdown options for task input types
        const taskTypes = this.props.reduxState.workflow.taskOptions.map(types =>{
        return (<option key={types.id} value={types.id}>{types.name}</option>)
        })

        return (
            <div className="">
                {this.props.reduxState.workflow.storeCurent.editTask === true && 
                    <>
                    {/* show phase edit form if triggered */}
                        {this.props.reduxState.workflow.storeCurent.task &&
                            <div className="add-phase">
                            <form className="form" data-id={this.props.reduxState.workflow.storeCurent.task.id} 
                                onSubmit={(e)=>this.saveTask(e, this.props.reduxState.workflow.storeCurent.task.id)}>
                                <li>
                                <label htmlFor="task-name">Task Title: </label>
                                    <input type="text" data-id={this.props.reduxState.workflow.storeCurent.task.id} 
                                        defaultValue={this.props.reduxState.workflow.storeCurent.task.name} placeholder="enter title for the task" 
                                        onChange={(e)=>this.handleChange(e, 'name')} />
                                    <span>Enter Task Name Here</span>
                                </li>
                                <li>
                                <label htmlFor="task-desctioption">Task Description: </label>
                                    <input type="text" size="50" data-id={this.props.reduxState.workflow.storeCurent.task.id} 
                                        defaultValue={this.props.reduxState.workflow.storeCurent.task.description} placeholder="enter description for the task" 
                                        onChange={(e)=>this.handleChange(e, 'description')} />
                                    <span>Describe the Task here</span>
                                </li>
                                <input type="submit" value="save" className="btn-sml"/>
                            </form>
                            <br/> 
                        </div>
                        }
                    </>
                }
                {this.props.reduxState.workflow.storeCurent.addTask === true && 
                    <div className="add-phase">
                        <form className="form" data-id="" onSubmit={(e)=>this.saveTask(e, this.state.id)}>
                            <li>
                            <label htmlFor="task-name">Task Title: </label>
                                <input type="text" data-id="" value={this.state.name} 
                                    placeholder="enter title for task" onChange={(e)=>this.handleChange(e, 'name')} />
                                <span>Enter Task Name Here</span>
                            </li>
                            <li>
                            <label htmlFor="phase-desctioption">Task Description: </label>
                                <input type="text" size="50" data-id="" value={this.state.description} 
                                    placeholder="enter description of task" onChange={(e)=>this.handleChange(e, 'description')} />
                                <span>Describe the Task here</span>
                            </li>
                            <input type="submit" value="save" className="btn-sml"/>
                        </form>
                        <br/> 
                    </div>
                }
                {this.props.reduxState.workflow.storeCurent.addTask === false && 
                <>  
                    <br/>
                    <br/>
                    <button onClick={this.editTask} className="btn-sml">Edit Task</button>
                    <button onClick={this.saveOptions} className="btn-sml">Save Task Options</button>
                    <select className="task-option" name="task-types">
                        {taskTypes}
                    </select> 
                    <hr/>
                </>
                }
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditTask);