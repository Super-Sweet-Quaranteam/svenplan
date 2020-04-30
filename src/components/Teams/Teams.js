import React, { Component } from 'react';
import { connect } from 'react-redux';

// this component holds info about teams and lets teams be edited
// currently unused an not in navbar, need to type URL in directly
// routes work to collect info from DB
// can later use this to edit user info by admin

class Teams extends Component {
  state = {
    display: false
  };

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_TEAMS'})
  }//this gets team info upon loading

  getSelectedUser(id) {
    this.props.dispatch({ type: 'FETCH_SELECTED_USER', payload: id });
    this.setState({display:true})
  }
  
  render() {
    return (
      <>
        <h2>Teams</h2>
        {this.props.reduxState.teams[0]&&
        <>
          {this.props.reduxState.teams.map((team) => 
          <div key={Math.random()}>
            <h3 key={team.id}>{team.name}</h3>
            {team.members.map(member =>
              <li key={Math.random()}>{member.firstname}
                <button onClick={() => this.getSelectedUser(member.id)}>See Profile</button>
              </li>
            )}
            </div>
          )}
        </>
        }
        {this.state.display === true &&
        <>
          <h2>Selected User</h2>
            <li>{this.props.reduxState.user.selectedUser.firstname}</li>
            <li>{this.props.reduxState.user.selectedUser.lastname}</li>
            <li>{this.props.reduxState.user.selectedUser.alias}</li>
            <li>{this.props.reduxState.user.selectedUser.company}</li>
            <li>{this.props.reduxState.user.selectedUser.email}</li>
            <li>{this.props.reduxState.user.selectedUser.id}</li>
            <li>{this.props.reduxState.user.selectedUser.phone}</li>
        </>
        }
      </>
    );
  }
}



const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(Teams);
