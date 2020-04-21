import React from 'react'; 
import { connect } from 'react-redux';
import './AdminHome.css'

//admin home was basically acting as half a nav, so I moved that stuff to nav
function AdminHome(props) {
    return (
        <>       
            <p>this is admin home</p>
            <p>something like....</p>
                <h2>Welcome, {props.user.currentUser.alias}</h2>
                <h3>here are some things you can do with an admin account (etc etc etc)</h3>

                {props.user.currentUser.team_id === null &&
                <>
                <p>Create a team:</p>
                <input placeholder="Team Name"></input>
                <button>Create</button>
                </>
                }
            {props.user.currentUser.team_id !== null &&
                <>
                <p>Your team: {props.user.currentUser.team}</p>
                    
                </>
            }

            <button onClick={() => props.history.push('/add-task-haley')}>Click Here for Task Add</button>
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AdminHome);