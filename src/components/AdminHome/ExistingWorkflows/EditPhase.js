import React, { Component } from 'react';
import {connect} from 'react-redux';
import EditTask from './EditTask';

class EditPhase extends Component {

    state={
        edit: this.props.edit,
        task:{
            id: this.props.id,
            name: this.props.name,
            description: this.props.description
        }
        
    }

    handleChange=(e, propertyName)=>{
        this.setState({
            task:{
                ...this.state.task,
                [propertyName]: e.target.value
            }
        })
    }

    handleSubmit=()=>{
        this.setState({edit: false})
        console.log(this.state.task)
        this.props.dispatch({type: 'EDIT_TASK_NAME', payload: this.state.task})
    }

    render() {
        return (
            <>
            {this.props.edit === false
            ?
            <>
            <EditTask
                wfID={this.props.wfID}
            />
            </>
            :
            <>
                <form data-id={this.props.id} onSubmit={(e)=>this.handleSubmit(e)}>
                    <label htmlFor="task-name">Task Title: 
                        <input type="text" data-id={this.props.id} value={this.state.task.name} placeholder="enter title for task" onChange={(e)=>this.handleChange(e, 'name')} />
                    </label>
                    <br/>
                    <label htmlFor="task-desctioption">Description: 
                        <input type="text" size="50" data-id={this.props.id} value={this.state.task.description} placeholder="enter description for task" onChange={(e)=>this.handleChange(e, 'description')} />
                    </label>
                    <br/>
                    <input type="submit" value="save" className="button"/>
                </form>
                <button className="btn-sml">Edit Tasks</button>
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