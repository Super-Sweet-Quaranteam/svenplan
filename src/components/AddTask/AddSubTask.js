import React, { Component } from 'react';
import {connect} from 'react-redux';



class AddTaskCard extends Component {

    displayTask = [];

    state = {
        showdata : this.displayTask,
        postVal : ""
    }


    appendData=()=>{
        this.displayTask.push(<div key={Math.random()} className="subtask-display"><pre>{this.state.postVal}</pre></div>);
        this.setState({
            showdata : this.displayTask,
            postVal : ""
        });
    }

    prependData=()=>{
        this.displayTask.unshift(<div key={Math.random()} className="subtask-display"><pre>{this.state.postVal}</pre></div>);
        this.setState({
            showdata : this.displayTask,
            postVal : ""
        });
    }

    handleChange=(e)=>{
        let getTextAreaValue = e.target.value;
        this.setState({
            postVal :getTextAreaValue
        });
    }

  render() {
    return (
        <div className="sub">
            <hr/>
            <h2>This Card is a subtask, displaying two levels deep</h2>
            <h3>three, if you count app.js</h3>
            <p>this is being displayed from form in AddTaskCard: </p> 
               { this.props.cardState.name } @ {this.props.cardState.time}
             
            <form>
                <input type="text" value={this.state.postVal} onChange={(e)=>this.handleChange(e)} />
                <input type="submit" onClick={this.prependData} value="before" />
                <input type="submit" onClick={this.appendData} value="after" />
            </form>
             <div className="subtask-display-Container">
             {this.displayTask}
             </div>
        </div>
      );
  }
}


const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(AddTaskCard);