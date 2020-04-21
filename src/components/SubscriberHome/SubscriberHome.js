import React from 'react';
import {connect} from 'react-redux';

const ClientHome =(props)=>{


    return (
        <>
            <h2>This is client home. Haley commented out what could probably be deleted. ClientNav is redundant at this point, I think.</h2>
            <p>can have like a little hello or various summaries on this page, doesn't matter til other things are populated</p>
           
            {props.user.currentUser.team_id === null &&
                <>
                    <p>Join a team:</p>
                    <input placeholder="Team Name"></input>
                    <button>Join</button>
                </>
            }
            {props.user.currentUser.team_id !== null &&
                <>
                    <p>Your team: {props.user.currentUser.team}</p>

                </>
            }
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});
  
export default connect(putReduxStateOnProps)(ClientHome);
