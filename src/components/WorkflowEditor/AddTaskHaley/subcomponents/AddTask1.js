import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTask1 extends Component {
    state = {

    }

    componentDidMount =()=> {
        this.props.dispatch({ type: 'FETCH_RISK_TYPES', payload: 1 });
    }

    submitNameDescription = () => {
        // this.props.dispatch({ type: 'SET_PHASE_ID', payload: this.state.phaseId })
        // this.props.history.push('/add-task-haley/2')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley')
    }
    
    render() {
        return (
        <>
            <p>Next, enter some basic details about the task:</p>
                <div>
                    <label htmlFor="titleInput">Title:<input type="text" id="titleInput"/></label>
                </div>
                <div>
                    <p>Risk Area (select all that apply):</p>
                    <input type="checkbox" id="check-text" value="text"/>
                        <label htmlFor="check-text">Risk Area</label>
                    <br/>
                    <input type="checkbox" id="check-text" value="text" />
                        <label htmlFor="check-text">New Risk Area</label>
                    
                </div>
            <button onClick={this.goBack}>Go Back A Step</button>
            <button onClick={this.submitNameDescription}>next step {this.state.phaseId}</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AddTask1);