import React, {Component} from 'react';
import {connect} from 'react-redux';



class AddTaskCard extends Component {

    // holds an array of what is to be displayed
    displayTask = [];

    state = {
        showdata: this.displayTask,
        post: ""
    }

    //adds a new sub task card to end of list
    appendData=()=>{
        this.displayTask.push(<div key={Math.random()} className="subtask-display">
           <strong>{this.state.post}</strong><br/></div>);
        this.setState({
            showdata: this.displayTask,
            post: ""
        });
    }

    handleChange=(e)=>{
        this.setState({
            post: e.target.value
        });
    }

    // currently sends subtask name to nowhere, will change to add relevant data
    publish=()=>{
        this.props.dispatch({type: 'PUBLISH_TASK', payload: this.displayTask})
    }


    render() {
        return (
            <div className="sub">
                <hr/>
                <h2>This Card is a subtask</h2>
                
                <form>
                    <input type="text" value={this.state.post} onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" onClick={this.appendData} value="save" className="button"/>
                </form>
                <div className="subtask-display-Container">
                    {this.displayTask}
                </div>
                <button className="button" onClick={this.publish}>Publish</button>
            </div>
        );
    }
}


const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTaskCard);