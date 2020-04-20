import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask7 extends Component {

    componentDidMount=()=>{
        this.props.dispatch({ type: 'FETCH_ASSIGNED_TASK', payload: {id:this.props.task.confirmation.id} });
    }

    markComplete = () => {
        // this.props.dispatch({ type: 'ADD_TASK_TO_SUBSCRIBER_DATABASE', payload: {id:this.props.task.confirmation.id} });
        // this.props.history.push('/add-task-haley/7')
    }

    render() {
        return (
        <>
            <h2>{this.props.task.confirmation.message}</h2>
            <p>There should be a confirmation message above.</p>
            <p>upon loading this component fetches the assigned task info</p>
            <h4>use sql join to get info about assigned task from default_tasks:</h4>
            <p>(could also get riskarea, links, inputs, etc with more queries)</p>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(withRouter(AddTask7));