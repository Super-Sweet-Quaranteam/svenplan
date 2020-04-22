import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// this component sends the task name and risk areas to the reducer.
// it gets all possible riskareas from the database using FETCH_TASK_RISK_TYPES
// (this requires risk areas to be set elsewhere)
// it could also be possible to set risk areas here with an 'add risk area' button

class AddTask1 extends Component {
    state = {
        titleInput: '',
        riskareas: [],
    }

    componentDidMount =()=> {
        this.props.dispatch({ type: 'FETCH_TASK_RISK_TYPES', payload: 1 });
    }

    nextStep = () => {
        this.props.dispatch({ type: 'SET_TASK_TITLE', payload: this.state.titleInput });
        this.props.dispatch({ type: 'SET_TASK_RISKAREAS', payload: this.state.riskareas });
        this.props.dispatch({ type: 'SET_TASK_SEQUENCE', payload: (Math.max(...this.props.workflow.thisPhase.map(task => task.task_sequence), 0) + 1)})
        this.props.dispatch({ type: 'NEXT_TASK_STEP'});
        // this.props.history.push('/add-task-haley/2')
    }

    goBack = () => {
        this.props.dispatch({ type: 'PREVIOUS_TASK_STEP' });
        // this.props.history.push('/add-task-haley')
    }

    handleTitleInput =(event)=> {
        this.setState({
            titleInput: event.target.value,
        })
    }
    
    handleRiskareas = (event) => {
        let riskAreaArray = this.state.riskareas;
        if (riskAreaArray.includes(event.target.value)) {
            //if in riskAreaArray, take it out
            let indexToSpliceOut = riskAreaArray.indexOf(event.target.value);
            riskAreaArray.splice(indexToSpliceOut, 1);
            this.setState({
                riskareas: riskAreaArray
            })
        }
        else {
            //if not in riskAreaArray, add it
            this.setState({
                riskareas: [...this.state.riskareas, event.target.value]
            })
        }
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
                                <input type="checkbox" id="check-text" value={riskarea.id} onChange={this.handleRiskareas}/>
                                <label htmlFor="check-text">{riskarea.riskarea}({riskarea.id})</label>
                            </div>
                        )}
                        </>
                    }                   
                </div>
            {/* <button onClick={this.goBack}>Go Back A Step</button> */}
            <button onClick={this.nextStep}>next step {this.state.phaseId}</button>
            <br/>
                <br />

                <br />

        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user,
    task: reduxState.task, 
    workflow: reduxState.workflow
});

export default connect(putReduxStateOnProps)(withRouter(AddTask1));