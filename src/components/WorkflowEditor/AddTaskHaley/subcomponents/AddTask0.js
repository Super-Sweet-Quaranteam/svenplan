import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//this component tells the reducer what phase holds the task that is being made

class AddTask0 extends Component {

    state = {
        phaseId: 1,
    }

    confirmPhaseID=()=>{
        this.props.dispatch({ type:'SET_TASK_PHASE_ID', payload: this.state.phaseId })
        this.props.history.push('/add-task-haley/1')
    }

    render(){
    return (
        <>
            <p>Before making a task, we'd need to know which phase in which workflow it belongs to.</p>
            <p>For the sake of this, lets say we are already in Phase 1 of the example Development Workflow.</p>
            <p>look at your phases table and enter the id of Phase1 of Workflow1. For me it's 1, with the queries in database.sql run on an empty db.</p>
            <label htmlFor="phaseId"><input type="number" id="phaseId"/></label>
            <button onClick={this.confirmPhaseID}>Add a task in phase with ID {this.state.phaseId}</button>
        </>
    );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(withRouter(AddTask0));