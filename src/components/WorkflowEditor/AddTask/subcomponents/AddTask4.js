import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends a description of the task to the reducer. pretty straightforward

class AddTask4 extends Component {
    state = {
        inputInput: '',
        promptInput:'',
    }

    nextStep = () => {
        // inputs are added with add input, so all next step needs to do is switch pages
        this.props.dispatch({ type: 'NEXT_TASK_STEP' });
    }

    goBack = () => {
        this.props.dispatch({ type: 'PREVIOUS_TASK_STEP' });
    }

    addInput =()=> {
        this.props.dispatch({ type: 'ADD_TASK_INPUT', payload: { type: this.state.inputInput, prompt: this.state.promptInput } });
    }

    handlePromptInput =(event)=> {
        this.setState({
            promptInput: event.target.value,
        })
    }

    handleInputInput = (event) => {
        this.setState({
            inputInput: event.target.value,
        })
    }

    render() {
        return (
        <>
            <p>Next, you can add inputs required to complete:</p>
            <ul>
                {this.props.task.taskInProgress.inputs &&
                    <>
                        {this.props.task.taskInProgress.inputs.map((input)=>
                            <p key={Math.random()}>{input.prompt} ({input.type})</p>
                        )}
                    </>
                }
            </ul>
            <div className="taskCard">
                <label htmlFor="urlInput"> input type:
                    <select id="urlInput" onChange={this.handleInputInput}>
                        <option value=""></option>
                        <option value="text">text</option>
                        <option value="number">number</option>
                        <option value="button">button</option>
                    </select> 
                </label>
            </div>
            <form className="form">
                <li>
                    <label htmlFor="promptInput">prompt</label>
                    <input type="text" id="promptInput" onChange={this.handlePromptInput} />
                    <span>enter prompt</span>
                </li>
            </form>
            <button className="btn-sml" onClick={this.addInput}>add required input</button>
            <br/>
            <br/>
            <button className="btn-sml" onClick={this.goBack}>Go Back A Step</button>
            <button className="btn-sml" onClick={this.nextStep}>Next Step</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.workflow
});

export default connect(putReduxStateOnProps)(withRouter(AddTask4));