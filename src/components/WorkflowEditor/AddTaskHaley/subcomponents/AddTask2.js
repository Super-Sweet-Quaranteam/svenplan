import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask2 extends Component {
    state = {
        descriptionInput: '',
    }

    nextStep = () => {
        this.props.dispatch({ type: 'SET_TASK_DESCRIPTION', payload: this.state.descriptionInput });
        // this.props.history.push('/add-task-haley/3')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley/1')
    }

    handleDescriptionInput =(event)=> {
        this.setState({
            descriptionInput: event.target.value,
        })
    }

    render() {
        return (
        <>
            <p>Next, enter a description of the task:</p>
                <div>
                    <label htmlFor="descriptionInput">
                        <textarea id="descriptionInput" value={this.props.task.taskInProgress.description} onChange={this.handleDescriptionInput}/>
                    </label>
                </div>
            <button onClick={this.goBack}>Go Back A Step</button>
            <button onClick={this.nextStep}>next step {this.state.phaseId}</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(withRouter(AddTask2));