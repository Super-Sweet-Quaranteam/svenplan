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
        // inputs are added with add link, so all next step needs to do is switch pages
        this.props.history.push('/add-task-haley/5')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley/3')
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
                    {this.props.task.taskInProgress.inputs&&
                        <>
                            {this.props.task.taskInProgress.inputs.map((input)=>
                                <p>{input.prompt} ({input.type})</p>
                            )}
                        </>
                    }
                </ul>
                <div>
                    <label htmlFor="urlInput"> input type:
                        <select id="urlInput" onChange={this.handleInputInput}>
                            <option value=""></option>
                            <option value="text">text</option>
                            <option value="number">number</option>
                            <option value="button">button</option>
                        </select> 
                    </label>
                </div>
                <div>
                    <label htmlFor="promptInput"> prompt:
                        <input type="text" id="promptInput" onChange={this.handlePromptInput} />
                    </label>
                    <div><button onClick={this.addInput}>add required input</button></div>
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

export default connect(putReduxStateOnProps)(withRouter(AddTask4));