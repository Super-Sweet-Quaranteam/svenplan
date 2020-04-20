import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask8 extends Component {

    fetchAssignedTask = () => {
        this.props.dispatch({ type: 'FETCH_ASSIGNED_TASK', payload: { id: this.props.task.confirmation.id } });
        // this.props.history.push('/add-task-haley/8')
    }

    render() {
        return (
        <>
            <p>upon loading this component fetches the assigned task info</p>
            <p>(could also get riskarea, links, inputs, etc with more queries)</p>

            <h3>Task info:</h3>
            {JSON.stringify(this.props.task.assignedTask)}

        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(withRouter(AddTask8));