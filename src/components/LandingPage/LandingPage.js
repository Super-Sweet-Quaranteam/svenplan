import React from 'react';
import logo from '../Logo/svenplan-logo2.png'
import "./LandingPage.css"


function LandingPage(props) {

   function Admin (event){
        props.history.push({ pathname: '/admin'})
    }
    function Client (event){
        props.history.push({ pathname: '/clientHome'})
    }
    function logIn(event){
        props.history.push({pathname:'/logIn'})
    }

    return (
        <div id="landingDisplay">
            <img className="logo" width= "300px" src={logo} alt="SvenPlan Logo"></img>
            <h4 onClick={logIn}>Log In</h4>

            <h4 onClick={Admin}>Admin Log In Placeholder</h4>
            <h4 onClick={Client}>Client Log In Placeholder</h4>
        </div>
    );
}

export default LandingPage;
