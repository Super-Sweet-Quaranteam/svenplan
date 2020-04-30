import React from 'react';
import "./LandingPage.css"


// changing landing page to user home routes, this will be deleteable along with the css
function LandingPage(props) {
    function Login(event) {
        props.history.push({ pathname: '/login' });

    }
    

    return (
        <div id="landingDisplay">
            <img className="hero-image" src="/images/skyline.png" alt="skyline" />
            <p className="landing-text">The Svenplan app helps enterprises build customized business workflows and track those workflows' progress with more transparency and accountability. Enterprises are able to add members to their team, and those team members are then able to choose among the workflows created by their overseeing enterprise, and guide themselves through the process.</p>
                <button className="btn-sml" onClick={Login}>Log In or Sign Up</button>
        </div>
    );
}

export default LandingPage;
