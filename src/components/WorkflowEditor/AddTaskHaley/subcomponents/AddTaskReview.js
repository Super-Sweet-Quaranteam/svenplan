import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask5 extends Component {
    state = {
        inputInput: '',
        promptInput:'',
    }

    addToDatabase = () => {
        Swal.fire('Created!')
        this.props.dispatch({ type: 'ADD_TASK_TO_DATABASE', payload: this.props.task.taskInProgress });
        this.props.dispatch({type: 'GET_THIS_PHASE', payload:{id: this.props.phase.id}});
        this.props.dispatch({type: 'TOGGLE_ADD_TASK'});
        // this.props.dispatch({type: 'TOGGLE_SHOW_PHASE'});
        this.props.dispatch({ type: 'GO_HOME_STEP' });
        // this.props.history.push('/add-task-haley/6')
    }

    goBack = () => {
        this.props.dispatch({ type: 'PREVIOUS_TASK_STEP' });
        this.props.history.push('/add-task-haley/4')
    }

    render() {
        return (
        <>
            <h3>Summary (from reducer)</h3>
                {this.props.task.taskInProgress.title && <h4>Title: {this.props.task.taskInProgress.title}</h4>}
                {this.props.task.taskInProgress.phaseId && <p>Phase ID: {this.props.task.taskInProgress.phaseId}</p>}
                {this.props.task.taskInProgress.riskareas &&
                <p>Risk Areas:
                {this.props.task.taskInProgress.riskareas.map((riskarea) =>
                    <span key={Math.random()}> {riskarea}/ </span>
                )}
                </p>
            }
                {this.props.task.taskInProgress.description && <p>Description: {this.props.task.taskInProgress.description}</p>}
                {this.props.task.taskInProgress.links &&
                <p>Links:
                    {this.props.task.taskInProgress.links.map((link) =>
                    <span><a href={link.url} rel="noopener noreferrer" target="_blank">{link.description} /</a></span>
                )}
                </p>
            }
                {this.props.task.taskInProgress.inputs &&
                <p>inputs:
                    {this.props.task.taskInProgress.inputs.map((input) =>
                    <p key={Math.random()}>{input.prompt} ({input.type})</p>
                )}
                </p>
            }
            <p>This demo doesn't really include edit/delete functionality, or being able to change the order of tasks.</p>
            <p>Click the button below to send the task to the database</p>
            <button className="btn-sml" onClick={this.goBack}>Go Back A Step</button>
            <button className="btn-sml" onClick={this.addToDatabase}>Add to Database</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task,
    phase: reduxState.workflow.storeCurent.phase
});

export default connect(putReduxStateOnProps)(withRouter(AddTask5));