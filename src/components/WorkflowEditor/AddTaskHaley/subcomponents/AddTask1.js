import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddTask1 extends Component {
    render() {
        return (
        <>
            <p>name and description of task</p>
        </>
    );
        }
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AddTask1);