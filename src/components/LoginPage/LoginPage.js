import React, { Component } from 'react';
import { connect } from 'react-redux';

import Teams from '../Teams/Teams';
import UserProfile from '../UserProfile/UserProfile';

//I (Haley) changed this file a lot from the prime starter
//for testing purposes and easier prs I wanted everything in one page
//I think once things are working it would make a lot of sense to make it a lot more modular
//for example prime code has a login page and a register page
//i'm just conditionally rendering and doing functions based on this.state.mode

class LoginPage extends Component {
  state = {
    mode: 'login',
    email: '',
    password: '',
    alias: '',
    firstname: '',
    lastname: '',
    phone: '',
    company: '',
  };


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_CURRENT_USER' });
    

  }//this gets user info, upon reload (from session, I think)

  login = (event) => {
    //don't reload page on submit
    event.preventDefault();
    //if all the things you need are filled for the current mode (this may change) dispatch the state to a saga
    //otherwise, let the user know what they did wrong 
    //(prime code has errors from reducers, we didn't copy that over so I'm gonna use a general alert for now)
    if (this.state.mode==='login' && this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.email,
          password: this.state.password,
        },
      });
      this.props.history.push('/home');
      // this.props.history.push({ pathname: '/' })
      // if (this.props.user.currentUser.level === 1) {
      //   this.props.history.push({ pathname: '/' })
      // }
      // if (this.props.user.currentUser.level === 2) {
      //   this.props.history.push({ pathname: '/clientHome' })
      // }
    }//end if login mode
    //register will eventually have more required fields but for now just email and password
    else if (this.state.mode === 'register' && this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.email,
          password: this.state.password,
          alias: this.state.alias,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          phone: this.state.phone,
          company: this.state.company,
        },
      });
      this.props.history.push({ pathname: '/' })
      // if(this.props.user.currentUser.level === 1){
      //   this.props.history.push({ pathname: '/' })
      // }
      //   if(this.props.user.currentUser.level === 2){
      //     this.props.history.push({ pathname: '/clientHome' })
      // }
    }//end if register mode
    else if (this.state.mode ==='login'){
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    else{
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }//end else (fields not filled, not able to dispatch)
    // window.location.reload(false);

  }//end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }//store input- didn't change from prime starter

  swtichMode=()=>{
    //update the state so new things show for buttons, header, and input
    //the copy is a clumsy/not for production, should be changed
    //also I think buttons and h1 text should maybe be conditionally rendered instead of from state
    if (this.state.mode==='login'){
      this.setState({mode:'register', toggleButtonText:'switch to login mode', headerText: 'Sign Up', submitValue: 'Register'})}
    else{
      this.setState({ mode: 'login', toggleButtonText: 'switch to register mode', headerText: 'Log In', submitValue: 'Log In' })}
  }

  //rendering login stuff vs register stuff depending on local state
  //probably should be broken into login page vs register page eventually
  //at least it'll be easy to copy the code with it divided like this?
  render() {
    return (
      <div>
        {/* <p>this.props.user.currentUser: {JSON.stringify(this.props.user)}</p> */}
        {this.props.user.currentUser.id 
          ?
            <div>
              <button className="btn-sml" onClick={() => this.props.dispatch({ type: 'LOGOUT' })}>Log Out</button>
              <UserProfile/>
              <Teams/>
            </div>
          :
            <>
            {/* display this stuff when there isn't a user detected */}
              {this.state.mode==='login'
                ?
                <>
                  <button type="button" className="btn-sml" onClick={this.swtichMode}>switch to register mode</button>
                  <form className="form" onSubmit={this.login}>
                    <h1>Log In</h1>
                    <h2>{this.props.errors.loginMessage}</h2>
                    <ul>
                      <li>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={this.state.email || ""} required
                            onChange={this.handleInputChangeFor('email')}/>
                        <span>Enter your email here</span>
                      </li>
                      <li>
                        <label htmlFor="password">Password:</label>
                          <input type="password" name="password" value={this.state.password || ""} required
                            onChange={this.handleInputChangeFor('password')}/>
                        <span>Enter your password here</span>
                      </li>
                    </ul>
                    <input className="button" type="submit" name="submit" value='Log In'/>
                  </form>
                </>
              :
              <>
                <button type="button" className="btn-sml" onClick={this.swtichMode}>switch to login mode</button>
                <form className="form" onSubmit={this.login}>
                  <h1>Register</h1>
                  <h2>{this.props.errors.registrationMessage}</h2>
                  <li>
                    <label htmlFor="firstname">First Name:</label>
                        <input type="text" name="firstname" value={this.state.firstname} required
                        onChange={this.handleInputChangeFor('firstname')} />
                    <span>Enter your first name here</span>
                  </li>
                  <li>
                    <label htmlFor="lastname">Last Name:</label>
                        <input type="text" name="lastname" value={this.state.lastname} required
                        onChange={this.handleInputChangeFor('lastname')} />
                    <span>Enter your last name here</span>
                  </li>
                  <li>
                    <label htmlFor="alias">What name should we display on your account?</label>
                        <input type="text" name="alias" value={this.state.alias} placeholder={this.state.firstname}
                        onChange={this.handleInputChangeFor('alias')} />
                    <span>Enter your display name here</span>
                  </li>
                  <li>
                    <label htmlFor="email">Email:</label>
                      <input type="email" name="email" value={this.state.username} required
                        onChange={this.handleInputChangeFor('email')} />
                    <span>Enter your email here</span>
                  </li>
                  <li>
                    <label htmlFor="phone">Phone Number:</label>
                        <input type="text" name="phone" value={this.state.phone}
                        onChange={this.handleInputChangeFor('phone')} />
                    <span>Enter your phone number here</span>
                  </li>
                  <li>
                    <label htmlFor="company">Company:</label>
                        <input type="text" name="company" value={this.state.company}
                        onChange={this.handleInputChangeFor('company')} />
                    <span>Enter company name here</span>
                  </li>
                  <li>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={this.state.password} required
                        onChange={this.handleInputChangeFor('password')} />
                    <span>Enter your password here</span>
                  </li>
                  <input className="button" type="submit" name="submit" value='Sign Up' />
                </form>
              </>
              }
          </>
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

export default connect(mapStateToProps)(LoginPage);
//prime code maps errors reducer to props so that dom displays different things accordingly
//seems like a good idea for user experience but not core to 'getting auth to work'
