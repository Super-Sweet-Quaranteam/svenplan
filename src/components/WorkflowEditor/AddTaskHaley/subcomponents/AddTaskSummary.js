import React from 'react';
import { connect } from 'react-redux';

//admin home was basically acting as half a nav, so I moved that stuff to nav
function AddTaskSummary(props) {
    return (
        <>
            <h3>Summary (from reducer)</h3>
                {props.task.taskInProgress.title && <h4>Title: {props.task.taskInProgress.title}</h4>}
                {props.task.taskInProgress.phaseId && <p>Phase ID: {props.task.taskInProgress.phaseId}</p>}
                {props.task.taskInProgress.riskareas && 
                    props.task.taskInProgress.riskareas.map((riskarea)=>
                        riskarea
                    )}
                {/* {JSON.stringify(props.task.taskInProgress.riskareas)} */}
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(AddTaskSummary);