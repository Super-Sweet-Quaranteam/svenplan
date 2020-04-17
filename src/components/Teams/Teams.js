import React, { Component } from 'react';
import { connect } from 'react-redux';

//this component holds info about teams and lets teams be edited

class Teams extends Component {
  state = {
    
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_TEAMS'})
  }//this gets team info upon loading


  render() {
    return (
      <div>
        <h2>Teams</h2>
        {this.props.teams[0]&&
      <>
          {this.props.teams.map((team) => 
          <>
            <h3 key={team.id}>{team.name}</h3>
              {team.members.map(member =>
                <li>{member.firstname}</li>
                )}
                </>
          )}
        </>
        }
      </div>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user,
  teams: state.teams
});

export default connect(mapStateToProps)(Teams);
