import React from 'react';
import logo from '../../Logo/svenplan-logo2.png'

function ExistingProjects(props) {

   
    return (
        <div >
            <img src={logo} width="75px" alt="SvenPlan Logo" />
            <p>Existing Projects </p>

            <h2>Your Current Projects:</h2>
            <p>Existing projects will render conditionally </p>
               
        </div>
    );
}

export default ExistingProjects;
