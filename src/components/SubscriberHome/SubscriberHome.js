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
            <img className="hero-image" src="/images/skyline.png" alt="skyline"/>
            {props.user.currentUser.team_id === null &&
                <form clasName="form">
                    <li>
                        <label>Join A Team</label>
                        <input type="text" onChange={handleChange} placeholder="Team Name"/>
                        <span>enter team name</span>
                    </li>
                    <button className="btn-sml" onClick={joinTeam}>Join</button>
                </form>
            }
            {props.user.currentUser.team_id !== null &&
                <>
                    <br/>
                    <br/>
                    <h2>Your team: {props.user.currentUser.team}</h2>
                </>
            }
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>This is client home. Haley commented out what could probably be deleted. ClientNav is redundant at this point, I think.</h2>
            <p>can have like a little hello or various summaries on this page, doesn't matter til other things are populated</p>
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});
  
export default connect(putReduxStateOnProps)(ClientHome);
