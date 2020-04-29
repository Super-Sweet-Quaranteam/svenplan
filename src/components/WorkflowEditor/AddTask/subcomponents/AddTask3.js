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
        this.props.dispatch({ type: 'NEXT_TASK_STEP' });
    }

    goBack = () => {
        this.props.dispatch({ type: 'PREVIOUS_TASK_STEP' });
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
        <div className="workflowDescription">
            <p>Next, you can add links:</p>
            <ul className="">
                {this.props.task.taskInProgress.links&&
                    <>
                        {this.props.task.taskInProgress.links.map((link)=>
                            <li key={Math.random()}><a href={link.url} rel="noopener noreferrer" target="_blank">{link.description}</a></li>
                            )}
                    </>
                }
            </ul>
            <form className="form">
                <li>
                    <label htmlFor="urlInput">url</label>
                    <input type="text" id="urlInput" placeholder="enter url" value={this.state.urlInput} onChange={this.handleUrlInput}/>
                    <span>make sure it starts with http://...</span>
                </li>
            </form>
            <form className="form">
                <li>
                    <label htmlFor="descriptionInput">text to display</label>
                    <input type="text" id="descriptionInput" onChange={this.handleDescriptionInput} />
                    <span>text to display when viewing link</span>
                </li>
            </form>
            <button className="btn-sml" onClick={this.addLink}>add link</button>
            <br/>
            <br/>
            <button className="btn-sml" onClick={this.goBack}>Go Back A Step</button>
            <button className="btn-sml" onClick={this.nextStep}>next step</button>
        </div>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.workflow
});

export default connect(putReduxStateOnProps)(withRouter(AddTask3));