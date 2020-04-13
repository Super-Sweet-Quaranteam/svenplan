import React from 'react';


function LandingPage(props) {

   function Admin (event){
        props.history.push({ pathname: '/adminHome'})
    }
    function Client (event){
        props.history.push({ pathname: '/clientHome'})
    }

    return (
        <div>
            <h1>SvenPlan</h1>
            <h4 onClick={Admin}>Admin Log In Placeholder</h4>
            <h4 onClick={Client}>Client Log In Placeholder</h4>
        </div>
    );
}

export default LandingPage;
