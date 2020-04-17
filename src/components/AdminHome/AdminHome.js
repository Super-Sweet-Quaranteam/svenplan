import React from 'react'; 
import { connect } from 'react-redux';
import './AdminHome.css'


function AdminHome(props) {
    return (
        <>       
            <p>this is admin home</p>
            <p>something like....</p>
                <h2>Welcome, {props.user.currentUser.alias}</h2>
                <h3>here are some things you can do with an admin account (etc etc etc)</h3>
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AdminHome);