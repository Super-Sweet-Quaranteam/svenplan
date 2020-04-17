import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';

class UserProfile extends Component {

  state={mode:'display'}

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }

  getSelectedUser(id){
    this.props.dispatch({ type: 'FETCH_SELECTED_USER', payload: id });
  }

  editMode=()=>{
    if (this.state.mode === 'display') {
      this.setState({ mode: 'edit' })
    }
    else if (this.state.mode === 'edit') {
      this.setState({ mode: 'display' })
    }
  }
 
  render() {

    
    if(this.state.mode==='display'){
    return (
      <div>

        <div className="profile">
          {/* <button onClick={() => this.props.dispatch({ type: 'FETCH_PROFILE', payload: this.props.user.id })}>See My Profile</button> */}
        
          <h2>{this.props.user.currentUser.alias}'s Profile</h2>
         
          <p>Email: {this.props.user.currentUser.email}</p>
          <p>Display Name: {this.props.user.currentUser.alias}</p>
          <p>Full Name: {this.props.user.currentUser.firstname} {this.props.user.currentUser.lastname}</p>
          <p>User ID: {this.props.user.currentUser.id}</p>
            <p>Level: {this.props.user.currentUser.level === 1 &&
             "Admin"  }
            {this.props.user.currentUser.level === 2 &&
              "Subscriber"}</p>
          <p><button onClick={this.editMode}>Edit Profile</button></p>
          <br></br>
            {this.props.user.selectedUser.team_id
                ?
              <p>Team: {this.props.user.selectedUser.team}</p>
                :
                <button>Add to Team</button>
              }
              {JSON.stringify(this.props.user.currentUser)}
          </div>
      </div>
    );
  }
  if(this.state.mode==='edit'){
    return(
      <>
      <p>in edit mode</p>
      <p><button onClick={this.editMode}>View Profile</button></p>
      </>
    )
  }
}
}



const mapStateToProps = state => ({
  user: state.user,
  teams: state.teams
});

export default connect(mapStateToProps)(UserProfile);