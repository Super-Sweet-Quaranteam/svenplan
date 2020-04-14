import React, { Component } from 'react';
import {connect} from 'react-redux';



class AddTaskCard extends Component {

    displayTask = [];

    state = {
        showdata: this.displayTask,
        post: ""
    }


    appendData=()=>{
        this.displayTask.push(<div key={Math.random()} className="subtask-display">
           <strong>{this.props.cardState.name}</strong><br/>{this.props.cardState.time}<br/><br/>{this.state.post}</div>);
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

    publish=()=>{
        this.props.dispatch({type: 'PUBLISH_TASK', payload: this.displayTask})
    }

    prependData=()=>{
        this.displayTask.unshift(<div key={Math.random()} className="subtask-display">
            <strong>{this.props.cardState.name}</strong><br/>{this.props.cardState.time}<br/><br/>{this.state.post}</div>);
        this.setState({
            showdata: this.displayTask,
            post: ""
        });
    }

    render() {
        return (
            <div className="sub">
                <hr/>
                <h2>This Card is a subtask, displaying two levels deep</h2>
                <h3>three, if you count app.js</h3>
                <p>this is being displayed from form in AddTaskCard: </p> 
                {this.props.cardState.name} @ {this.props.cardState.time}
                
                <form>
                    <input type="text" value={this.state.post} onChange={(e)=>this.handleChange(e)} />
                    <input type="submit" onClick={this.prependData} value="before" className="button"/>
                    <input type="submit" onClick={this.appendData} value="after" className="button"/>
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