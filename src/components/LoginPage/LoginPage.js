import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  };

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
          email: this.state.email,
          password: this.state.password,
        },
      });
    }//end if login mode
    //register will eventually have more required fields but for now just email and password
    else if (this.state.mode === 'register' && this.state.email && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    }//end if register mode
    else {
      alert('please fill in all required fields');
    }//end else (fields not filled, not able to dispatch)
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
        {this.state.mode==='login'
          ?
          <form onSubmit={this.login}>
            <button type="button" className="link-button" onClick={this.swtichMode}>switch to register mode</button>

            <h1>Log In</h1>
            <div>
              <label htmlFor="email">
                Email:
                  <input type="email" name="email" value={this.state.username}
                  onChange={this.handleInputChangeFor('email')}/>
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
                <input type="password" name="password" value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}/>
              </label>
            </div>
            <div>
              <input className="log-in" type="submit" name="submit" value='Log In'/>
            </div>
          </form>
        :
          <form onSubmit={this.login}>
            <button type="button" className="link-button" onClick={this.swtichMode}>switch to login mode</button>

            <h1>Register</h1>
            <div>
              <label htmlFor="email">
                Email:
                <input type="email" name="email" value={this.state.username}
                  onChange={this.handleInputChangeFor('email')} />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                Password:
              <input type="password" name="password" value={this.state.password}
                  onChange={this.handleInputChangeFor('password')} />
              </label>
            </div>
            <div>
              <input className="log-in" type="submit" name="submit" value='Sign Up' />
            </div>
          </form>
        }
      </div>
    );
  }
}

export default connect()(LoginPage);
//put mapStateToProps inside parentheses if reduxState is needed
//prime code maps errors reducer to props so that dom displays different things accordingly
//seems like a good idea for user experience but not core to 'getting auth to work'
