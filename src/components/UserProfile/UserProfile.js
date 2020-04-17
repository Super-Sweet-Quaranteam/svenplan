import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';

class UserProfile extends Component {
  state = {
    selectedUserID: this.props.user.id,
    selectedUser: this.props.user
  };

  componentDidMount() {
    // this.props.dispatch({ type: 'FETCH_CURRENT_USER' })
  }

  getSelectedUser(id){
    console.log('in getSelectedUser with id:', id)
    if (id===this.props.user.id){
      this.setState({
        selectedUserID: this.props.user.id,
        selectedUser: this.props.user
      })
    }
  }
 


  render() {
    return (
      <div className="profile">
        <button onClick={() => this.getSelectedUser(this.props.user.id)}>See My Profile</button>
        {/* <button onClick={() => this.props.dispatch({ type: 'FETCH_PROFILE', payload: this.props.user.id })}>See My Profile</button> */}

        <h2>{this.state.selectedUser.alias}'s Profile</h2>
        <p>Full Name: {this.props.user.firstname} {this.props.user.lastname}</p>
        <p>User ID: {this.state.selectedUserID}</p>
        <p>Level: {this.props.user.level}</p>
        {this.props.user.team_id
          ?
          <p>Team: {this.props.user.team}</p>
          :
          <button>Add to Team</button>
        }
      </div>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  teams: state.teams
});

export default connect(mapStateToProps)(UserProfile);