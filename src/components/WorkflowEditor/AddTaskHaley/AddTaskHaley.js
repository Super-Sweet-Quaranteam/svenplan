import React from 'react';
import { connect } from 'react-redux';

//admin home was basically acting as half a nav, so I moved that stuff to nav
function AddTask(props) {
    return (
        <>
            <p>Haley's add task thingy</p>
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AddTask);