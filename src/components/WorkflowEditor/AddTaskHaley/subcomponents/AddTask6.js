import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask6 extends Component {

    addToDatabase = () => {
        this.props.dispatch({ type: 'ADD_TASK_TO_SUBSCRIBER_DATABASE', payload: {id:this.props.task.confirmation.id} });
        this.props.history.push('/add-task-haley/7')
    }

    render() {
        return (
        <>
            <h2>{this.props.task.confirmation.message}</h2>
            <p>There should be a confirmation message above.</p>
            <p>Click the button to create a new row in assigned_tasks that references the row in default_tasks you just made.</p>
            <button onClick={this.addToDatabase}>Add to assigned_tasks</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(withRouter(AddTask6));