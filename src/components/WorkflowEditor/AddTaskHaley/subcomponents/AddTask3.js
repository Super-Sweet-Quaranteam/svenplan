import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends link objects to the reducer. there can me more than one.

class AddTask3 extends Component {
    state = {
        urlInput: '',
        descriptionInput:'',
    }

    nextStep = () => {
        // links are added with add link, so all next step needs to do is switch pages
        this.props.history.push('/add-task-haley/4')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley/2')
    }

    addLink =()=> {
        this.props.dispatch({ type: 'ADD_TASK_LINK', payload: { url: this.state.urlInput, description: this.state.descriptionInput } });
    }

    handleDescriptionInput =(event)=> {
        this.setState({
            descriptionInput: event.target.value,
        })
    }

    handleUrlInput = (event) => {
        this.setState({
            urlInput: event.target.value,
        })
    }

    render() {
        return (
        <>
            <p>Next, you can add links:</p>
                <ul>
                    {this.props.task.taskInProgress.links&&
                        <>
                            {this.props.task.taskInProgress.links.map((link)=>
                                <li><a href={link.url} target="_blank">{link.description}</a></li>
                                )}
                        </>
                    }
                </ul>
                <div>
                    <label htmlFor="urlInput"> url:
                        <input type="text" id="urlInput" placeholder="make sure it starts with http://..." value={this.state.urlInput} onChange={this.handleUrlInput}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="descriptionInput"> text to display:
                        <input type="text" id="descriptionInput" value={this.state.description} onChange={this.handleDescriptionInput} />
                    </label>
                    <div><button onClick={this.addLink}>add link</button></div>
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

export default connect(putReduxStateOnProps)(withRouter(AddTask3));