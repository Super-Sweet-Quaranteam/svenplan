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
    toggleButtonText: 'switch to register mode',
    headerText: 'Log In',
    submitValue: 'Log In',
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
    //the copy is a bit clumsy, but can be changed
    //also I think buttons and h1 text should maybe be conditionally rendered instead of from state
    if (this.state.mode==='login'){
      this.setState({mode:'register', toggleButtonText:'switch to login mode', headerText: 'Sign Up', submitValue: 'Register'})}
    else{
      this.setState({ mode: 'login', toggleButtonText: 'switch to register mode', headerText: 'Log In', submitValue: 'Log In' })}
  }

  render() {
    return (
      <div>
        <button type="button" className="link-button" onClick={this.swtichMode}>
          {this.state.toggleButtonText}
        </button>

        {/* this.props.errors is currently undefined */}
        {/* {this.props.errors.loginMessage && (<h2 className="alert" role="alert">{this.props.errors.loginMessage}</h2>)} */}
        <form onSubmit={this.login}>
          <h1>{this.state.headerText}</h1>
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
            <input className="log-in" type="submit" name="submit" value={this.state.submitValue}/>
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
// const mapStateToProps = state => ({
//   errors: state.errors,
// });
export default connect()(LoginPage);
//put mapStateToProps inside parentheses if reduxState is needed
