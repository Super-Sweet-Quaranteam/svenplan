import React from 'react';
import {connect} from 'react-redux';

const ClientHome =(props)=>{


    let teamName = ''

    function handleChange(event) {
        teamName = event.target.value
        console.log(teamName)
    }
    function joinTeam() {
        console.log('teamname dispatch', teamName)
        props.dispatch({ type: 'UPDATE_USER_TEAM', payload: teamName })

    }


    return (
        <>
            <h2>This is client home. Haley commented out what could probably be deleted. ClientNav is redundant at this point, I think.</h2>
            <p>can have like a little hello or various summaries on this page, doesn't matter til other things are populated</p>
           
            {props.user.currentUser.team_id === null &&
                <>
                    <p>Join a team:</p>
                    <input onChange={handleChange} placeholder="Team Name"></input>
                    <button onClick={joinTeam}>Join</button>
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
