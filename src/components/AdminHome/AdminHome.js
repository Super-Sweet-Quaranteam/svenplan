import React from 'react'; 
import { connect } from 'react-redux';
import './AdminHome.css'

//admin home was basically acting as half a nav, so I moved that stuff to nav
function AdminHome(props) {

    //this gets info about the logged in user (snagged from UserProfile componentDidMount)
    props.dispatch({ type: 'FETCH_CURRENT_USER', payload: props.user.currentUser.id })

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