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
        this.props.dispatch({ type: 'NEXT_TASK_STEP' });
        // this.props.history.push('/add-task-haley/3')
    }

    goBack = () => {
        this.props.dispatch({ type: 'PREVIOUS_TASK_STEP' });
        // this.props.history.push('/add-task-haley/1')
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
            <form className="form">
                <li>
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea id="descriptionInput" defaultValue={this.state.descriptionInput || ""} onChange={this.handleDescriptionInput}/>
                    <span>enter task descrtiption</span>
                </li>
            </form>
            <button className="btn-sml" onClick={this.goBack}>Go Back A Step</button>
            <button className="btn-sml" onClick={this.nextStep}>next step</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.workflow
});

export default connect(putReduxStateOnProps)(withRouter(AddTask2));