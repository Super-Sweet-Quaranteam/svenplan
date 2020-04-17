import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';

class UserProfile extends Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }

  getSelectedUser(id){
    this.props.dispatch({ type: 'FETCH_SELECTED_USER', payload: id });
  }
 
  render() {
    return (
      <div>
        <button onClick={() => this.getSelectedUser(this.props.user.currentUser.id)}>See My Profile</button>

        <div className="profile">
          {/* <button onClick={() => this.props.dispatch({ type: 'FETCH_PROFILE', payload: this.props.user.id })}>See My Profile</button> */}

          <h2>{this.props.user.currentUser.alias}'s Profile</h2>
            <p>Full Name: {this.props.user.currentUser.firstname} {this.props.user.currentUser.lastname}</p>
            <p>User ID: {this.props.user.currentUser.id}</p>
            <p>Level: {this.props.user.currentUser.level}</p>
            {this.props.user.selectedUser.team_id
                ?
              <p>Team: {this.props.user.selectedUser.team}</p>
                :
                <button>Add to Team</button>
              }
          </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  user: state.user,
  teams: state.teams
});

export default connect(mapStateToProps)(UserProfile);