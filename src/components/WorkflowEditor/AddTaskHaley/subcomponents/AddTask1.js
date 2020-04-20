import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTask1 extends Component {
    state = {
        addingNewRiskArea: false,
        titleInput: '',
        riskareas: [],
    }

    componentDidMount =()=> {
        this.props.dispatch({ type: 'FETCH_RISK_TYPES', payload: 1 });
    }

    nextStep = () => {
        // this.props.dispatch({ type: 'SET_PHASE_ID', payload: this.state.phaseId })
        // this.props.history.push('/add-task-haley/2')
    }

    goBack = () => {
        this.props.history.push('/add-task-haley')
    }

    handleTitleInput =(event)=> {
        this.setState({
            titleInput: event.target.value,
        })
    }
    
    render() {
        return (
        <>
            <p>Next, enter some basic details about the task:</p>
                <div>
                    <label htmlFor="titleInput">
                        Title:<input type="text" id="titleInput" onChange={this.handleTitleInput}/>
                    </label>
                </div>
                <div>
                    <p>Risk Area (select all that apply):</p>
                    {this.props.task.taskInProgress.riskareaOptions&&
                        <>
                        {this.props.task.taskInProgress.riskareaOptions.map((riskarea)=>
                            <div>
                                <input type="checkbox" id="check-text" value={riskarea} />
                                <label htmlFor="check-text">{riskarea}</label>
                            </div>
                        )}
                        </>
                    }

                    <input type="checkbox" id="check-text" value="text" />
                        <label htmlFor="check-text">New Risk Area</label>
                    
                </div>

            <h3>state:</h3>
            {JSON.stringify(this.state)}
            <br/>
            <button onClick={this.goBack}>Go Back A Step</button>
            <button onClick={this.submitNameDescription}>next step {this.state.phaseId}</button>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task
});

export default connect(putReduxStateOnProps)(AddTask1);