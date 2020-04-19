import React from 'react';
import { connect } from 'react-redux';

//admin home was basically acting as half a nav, so I moved that stuff to nav
function AddTaskSummary(props) {
    return (
        <>
            <h3>Summary</h3>
            <p>Here's what the task looks like so far (in reducer, not db)</p>
            <p>taskInProgress in taskReducer is:</p>
            <p>{JSON.stringify(props.task)}</p>
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(AddTaskSummary);