import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';

class UserProfile extends Component {

  state={
    mode:'display',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }

  // not seing where this is being used???? is this not needed?
  getSelectedUser(id){
    this.props.dispatch({ type: 'FETCH_SELECTED_USER', payload: id });
  }

  editMode=()=>{
    if (this.state.mode === 'display') {
      this.setState({ mode: 'edit',
        email: this.props.user.currentUser.email,
        firstname: this.props.user.currentUser.firstname,
        lastname: this.props.user.currentUser.lastname,
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
    this.editMode();
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
             "Application Admin"  }
            {this.props.user.currentUser.level === 2 &&
              "Enterprise Admin"}
            {this.props.user.currentUser.level === 3 &&
              "Team Member"}
            {this.props.user.currentUser.level === 4 &&
              "Log In Created"}</p>
          <p><button className="btn-sml" onClick={this.editMode}>Edit Profile</button></p>
          <br></br>
            {this.props.user.currentUser.team_id
                ?
              <p>Team: {this.props.user.currentUser.team}</p>
                :
                <button className="btn-sml" >Add to Team</button>
              }
          </div>
      </div>
    );
  }
  if(this.state.mode==='edit'){
    return(
      <>
        <h2>Edit Profile</h2>
        <br/>
        <form className="form">
          <ul>
            <li>
              <label htmlFor="emailEdit">Email:</label>
              <input type="email" id='emailEdit' onChange={this.handleInputChangeFor('email')} value={this.state.email || ""}></input>
              <span>Enter your email here</span>
            </li>
            <li>
              <label htmlFor="aliasEdit">Display Name:</label>
              <input type="text" id='aliasEdit' onChange={this.handleInputChangeFor('alias')} value={this.state.alias || ""}></input>
              <span>Enter your display name here</span>
            </li>
            <li>
              <label htmlFor="firstNameEdit">First Name:</label>
              <input type="text" id='firstNameEdit' onChange={this.handleInputChangeFor('firstname')} value={this.state.firstname || ""}></input>
              <span>Enter your first name here</span>
            </li>
            <li>
              <label htmlFor="lastNameEdit">Last Name:</label>
              <input type="text" id='lastNameEdit' onChange={this.handleInputChangeFor('lastname')} value={this.state.lastname || ""}></input>
              <span>Enter your last name here</span>
            </li>
          </ul>
          <button className="btn-sml" onClick={this.updateUser}>Save Profile</button>
          <button className="btn-sml" onClick={this.editMode}>View Profile</button>
        </form>
          

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