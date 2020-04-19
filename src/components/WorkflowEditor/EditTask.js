import React, {Component} from 'react';
import {connect} from 'react-redux';


class EditTask extends Component {

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_TASK_OPTIONS'})
    }

    render() {
        
        return (
            <div className="taskCard">
                <hr/>
                <div>{this.props.wfID}</div>
                <div>{this.props.wfID}</div>
                <div>{this.props.taskID}</div>
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(EditTask);