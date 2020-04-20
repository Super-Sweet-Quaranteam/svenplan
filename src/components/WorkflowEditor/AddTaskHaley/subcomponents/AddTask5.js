import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask5 extends Component {
    state = {
        inputInput: '',
        promptInput:'',
    }

    addToDatabase = () => {
        this.props.dispatch({ type: 'ADD_TASK_TO_DATABASE', payload: this.props.task.taskInProgress });
        this.props.history.push('/add-task-haley/6')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley/4')
    }

    render() {
        return (
        <>
            <p>This demo doesn't really include edit/delete functionality, or being able to change the order of tasks.</p>
            <p>Click the button below to send the task to the database</p>
            <button onClick={this.goBack}>Go Back A Step</button>
            <button onClick={this.addToDatabase}>Add to Database</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(withRouter(AddTask5));