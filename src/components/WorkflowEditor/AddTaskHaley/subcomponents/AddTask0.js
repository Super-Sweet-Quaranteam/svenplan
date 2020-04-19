import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTask0 extends Component {
    render(){
    return (
        <>
            <p>Before making a task, we'd need to know which phase in which workflow it belongs to.</p>
            <p>For the sake of this, lets say we are already in Phase 1 of the example Development Workflow.</p>
            <p>look at your phases table and enter the id of Phase1 of Workflow1. For me it's 1, with the queries in database.sql run on an empty db.</p>

            <button onClick={()=>this.props.history.push('/add-task-haley/1')}>Go to next step</button>
        </>
    );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(withRouter(AddTask0));