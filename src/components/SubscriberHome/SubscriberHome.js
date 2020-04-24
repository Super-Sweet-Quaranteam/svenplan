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
                <form className="form">
                    <li>
                        <label>Join A Workflow Group</label>
                        <input type="text" onChange={handleChange} placeholder="Access Code"/>
                        <span>enter access code associated with a workflow group</span>
                    </li>
                    <button className="btn-sml" onClick={joinTeam}>Join</button>
                </form>
            }
            {props.user.currentUser.team_id !== null &&
                <>
                    <br/>
                    <br/>
                    <h2>Your Workflow Group: {props.user.currentUser.team}</h2>
                </>
            }
            <br/>
            <br/>
            <br/>
            <br/>
            
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});
  
export default connect(putReduxStateOnProps)(ClientHome);
