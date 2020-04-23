import React from 'react'; 
import { connect } from 'react-redux';
import './AdminHome.css'

// landing place for admins, currently can view team name or create if dont have one
function AdminHome(props) {

    let teamName=''

    function handleChange(event){
        teamName = event.target.value
    }
   function createTeam(){
       props.dispatch({ type: 'CREATE_TEAM', payload:teamName })
     
    }
    return (
        <>       
            <img className="hero-image" src="/images/skyline.png" alt="skyline"/>
                <h2>Welcome, {props.user.currentUser.alias}</h2>

                {props.user.currentUser.team_id === null &&
                <>
                <p>:</p>
                <form className='form' onClick={createTeam}>
                    <li>
                        <label>Create A Team</label>
                        <input type="text" onChange={handleChange} placeholder="Team Name"/>
                        <span>choose a team name</span>
                    </li>
                    <input className="btn-sml" type="submit" value="create"/>
                </form>
                </>
                }
            {props.user.currentUser.team_id !== null &&
                <>
                <br/>
                <h2>Your team: {props.user.currentUser.team}</h2>
                </>
            }
        </>
    );
}

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user
});

export default connect(putReduxStateOnProps)(AdminHome);