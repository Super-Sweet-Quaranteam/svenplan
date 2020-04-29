import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfile.css';
import Swal from 'sweetalert2'

class UserProfile extends Component {

  state={
    mode:'display',
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER', payload: this.props.user.currentUser.id })
  }
  // changes between edit profile and view profile
  editMode=()=>{
      if (this.state.mode === 'display') {
        this.setState({ mode: 'edit',
          email: this.props.user.currentUser.email,
          firstname: this.props.user.currentUser.firstname,
          lastname: this.props.user.currentUser.lastname,
          alias: this.props.user.currentUser.alias,
          id: this.props.user.currentUser.id,
          team: this.props.user.currentUser.team})
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
  }

  // updates user profile
  updateUser=()=>{
    this.props.dispatch({ type: 'UPDATE_CURRENT_USER', payload:this.state });
    Swal.fire('Success!')
    this.setState({ mode: 'display'})
  }

  // updates users team
  updateTeam = () => {
    this.props.dispatch({ type: 'UPDATE_USER_TEAM', payload: this.state.team });
    Swal.fire('Success!')
  }
 
  render() {
      if(this.state.mode==='display'){
      return (
        <div className="profile">
          <h2>{this.props.user.currentUser.alias}'s Profile</h2>
          <p>Email: {this.props.user.currentUser.email}</p>
          <p>Display Name: {this.props.user.currentUser.alias}</p>
          <p>Full Name: {this.props.user.currentUser.firstname} {this.props.user.currentUser.lastname}</p>
          <p>Access Level: {this.props.user.currentUser.level === 1 &&
            "Application Admin"  }
            {this.props.user.currentUser.level === 2 &&
              "Workflow Creator"}
            {this.props.user.currentUser.level === 3 &&
              "Project User"}
          </p>
          <p><button className="btn-sml" onClick={this.editMode}>Edit Profile</button></p>
              <br/>
              <br/>
            {this.props.user.currentUser.team_id
              ?
              <p>Workflow Group: {this.props.user.currentUser.team}</p>
              :
              <p>Not part of any workflow group</p>
            }
        </div>
      );
    }
    if(this.state.mode==='edit'){
      return(
        <>
          <h2>Edit Profile</h2>
          <br/>
          <form className="form">
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
            <button className="btn-sml" onClick={this.updateUser}>Save Profile</button>
          </form>
          <br/>
          <br/>
          <br/>
          <form className="form">
            <li>
              <label htmlFor="teamEdit">Workflow Group:</label>
              <input type="text" id='teamEdit' onChange={this.handleInputChangeFor('team')} value={this.state.team || ""}></input>
              <span>Enter your access code here</span>
            </li>
            <button className="btn-sml" onClick={this.updateTeam}>Save Workflow Group</button>
          </form>
          <br/>
          <br/>
          <button className="btn-sml" onClick={this.editMode}>Back To View</button>
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