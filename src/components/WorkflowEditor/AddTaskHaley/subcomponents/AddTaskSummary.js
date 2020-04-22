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
                    <p>Risk Areas:  
                    {props.task.taskInProgress.riskareas.map((riskarea)=>
                        <span key={Math.random()}> {riskarea}/ </span>
                    )}
                    </p>
                }
                {props.task.taskInProgress.description && <p>Description: {props.task.taskInProgress.description}</p>}
                {props.task.taskInProgress.links &&
                    <p>Links:
                        {props.task.taskInProgress.links.map((link) =>
                            <span key={Math.random()}><a href={link.url} rel="noopener noreferrer" target="_blank">{link.description} /</a></span>
                        )}
                    </p>
                }
                {props.task.taskInProgress.inputs &&
                    <p>inputs:
                        {props.task.taskInProgress.inputs.map((input) =>
                            <p key={Math.random()}>{input.prompt} ({input.type})</p>
                        )}
                    </p>
                }
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(AddTaskSummary);