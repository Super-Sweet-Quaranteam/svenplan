import React from 'react';
import logo from '../Logo/svenplan-logo2.png'
import "./LandingPage.css"


function LandingPage(props) {
    function Admin(event) {props.history.push({ pathname: '/admin' })}
    function Client(event) { props.history.push({ pathname: '/dashboard' })}
    

    return (
        <div id="landingDisplay">
            <h3>routes aren't protected yet.</h3>
            <p>Later, logging in will go to '/home'. For now:</p>
                <button className="btn-sml" onClick={Admin}>Go to Admin Home</button>
                <button className="btn-sml" onClick={Client}>Go to Subscriber Home</button>
                <br/>
            <img className="logo" width="300px" src={logo} alt="SvenPlan Logo"></img>
        </div>
    );
}

export default LandingPage;
