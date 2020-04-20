import React from 'react';
import logo from '../Logo/svenplan-logo2.png'
import "./LandingPage.css"


function LandingPage(props) {
    function Admin(event) {props.history.push({ pathname: '/admin' })}
    function Client(event) { props.history.push({ pathname: '/dashboard' })}
    function logIn(event) {props.history.push({ pathname: '/logIn' })
    }

    return (
        <div id="landingDisplay">
            <h3>routes aren't protected yet.</h3>
            <p>Later, logging in will go to '/home'. For now:</p>
                <h4 onClick={logIn}>Log In</h4>
                <h4 onClick={Admin}>Go to Admin Home</h4>
                <h4 onClick={Client}>Go to Subscriber Home</h4>
            <img className="logo" width="300px" src={logo} alt="SvenPlan Logo"></img>
        </div>
    );
}

export default LandingPage;
