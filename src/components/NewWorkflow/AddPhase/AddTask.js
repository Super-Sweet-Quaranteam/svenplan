import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddTask extends Component {
    
    // holds an array of what is to be displayed
    displayTask = [];

    state={
        showdata: this.displayTask,
        post: "",
        displaySub: false,
        time: new Date(),
        name: 'new task'
    }

    handleChange=(e)=>{
        this.setState({
            post: e.target.value,
            name: e.target.value,
            time: new Date()
        });
    }

    // currently sends state to no where, will update with relevant data
    handleSubmit=(e)=>{
        e.preventDefault();
        this.displayTask.push(<div key={Math.random()} className="subtask-display">
           <strong>{this.state.post}</strong><br/><button className="button" 
                onClick={(e)=>this.editTask(e)}>
                edit</button></div>);
        this.setState({
            showdata: this.displayTask,
            post: ""
        });
        this.props.dispatch({type: 'ADD_TASK', payload: this.state})
    }

    //this is not the appropriate data to publish full workflow
    publish=()=>{
        this.props.dispatch({type: 'PUBLISH_TASK', payload: this.displayTask})
    }

    render() {
        return (
            <div data-id={this.props.data} className="taskCard">
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Add Task Name" value={this.state.post} onChange={(e)=>this.handleChange(e)}/>
                    <input type="submit" value="save" className="button"/>
                </form>
                <div className="taskContainer">
                        {this.displayTask}
                </div>

                <button className="button" onClick={this.publish}>Publish</button>

                <br/>
            </div>
        );
    }
}


const putReduxStateOnProps=(reduxState)=>({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTask);