import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddSubTask from './AddSubTask';

class AddTask extends Component {
    
    state={
        displaySub: false,
        time: new Date(),
        name: 'new task'
    }

    handleChange=(e)=>{
        this.setState({
            name: e.target.value,
            time: new Date()
        });
    }
    // currently sends state to no where, will update with relevant data
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.dispatch({type: 'SENDING_NAME', payload: this.state})
    }


render() {
    return (
        <div className="taskCard">
            <hr/>
            <h1>{this.state.name}</h1>
            
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="typeHere" placeholder="Add Task Name" onChange={(e)=>this.handleChange(e)}/>
                <input type="submit" value="save" className="button"/>
            </form>
            <button className="button" onClick={()=>this.setState({displaySub: !this.state.displaySub})}>display sub-task</button>
                {this.state.displaySub
                ? 
                <AddSubTask />
                : 
            null}
            <br/>
        </div>
    );
}
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTask);