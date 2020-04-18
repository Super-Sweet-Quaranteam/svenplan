import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';

class UserProfile extends Component {

  state={mode:'display',
}

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }

  getSelectedUser(id){
    this.props.dispatch({ type: 'FETCH_SELECTED_USER', payload: id });
  }

  editMode=()=>{
    if (this.state.mode === 'display') {
      this.setState({ mode: 'edit',
        email: this.props.user.currentUser.email,
        firstName: this.props.user.currentUser.firstname,
        lastName: this.props.user.currentUser.lastname,
        alias: this.props.user.currentUser.alias,
        id: this.props.user.currentUser.id })
    }
    else if (this.state.mode === 'edit') {
      this.setState({ mode: 'display'})
    }
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(this.state)
  }

  updateUser=()=>{
    this.props.dispatch({ type: 'UPDATE_CURRENT_USER', payload:this.state });
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
            <p>Access Level: {this.props.user.currentUser.level === 1 &&
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
      <h2>Edit Profile</h2>
        <label htmlFor="emailEdit">Email:</label>
        <input id='emailEdit' onChange={this.handleInputChangeFor('email')} value={this.state.email}></input>
        <label htmlFor="aliasEdit">Display Name:</label>
        <input id='aliasEdit' onChange={this.handleInputChangeFor('alias')} value={this.state.alias}></input>
        <label htmlFor="firstNameEdit">First Name:</label>
        <input id='firstNameEdit' onChange={this.handleInputChangeFor('firstname')} value={this.state.firstName}></input>
        <label htmlFor="lastNameEdit">Last Name:</label>
        <input id='lastNameEdit' onChange={this.handleInputChangeFor('lastname')} value={this.state.lastName}></input>
        <p><button onClick={this.updateUser}>Save Profile</button></p>
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