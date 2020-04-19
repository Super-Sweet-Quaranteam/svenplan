import React, {Component} from 'react';
import {connect} from 'react-redux';


class EditTask extends Component {

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_TASK_OPTIONS'})
    }

    render() {
        
        // creates the dropdown options for task input types
        const taskTypes = this.props.reduxState.workflow.taskOptions.map(types =>{
        return (<option key={types.id} value={types.id}>{types.name}</option>)
        })

        return (
            <div className="taskCard">
                <select className="task-option" name="task-types">
                    {taskTypes}
                </select> 
                <hr/>
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditTask);