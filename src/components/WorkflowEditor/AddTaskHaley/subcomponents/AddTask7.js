import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask7 extends Component {

    fetchAssignedTask = () => {
        this.props.dispatch({ type: 'FETCH_ASSIGNED_TASK', payload: { id: this.props.task.confirmation.id } });
        this.props.history.push('/add-task-haley/8')
    }

    render() {
        return (
        <>
            <h2>{this.props.task.confirmation.message}</h2>
            <p>There should be a confirmation message above.</p>
            {/* <p>upon loading this component fetches the assigned task info</p> */}
            <button onClick={this.fetchAssignedTask}>use sql join to get info about assigned task from default_tasks</button>
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